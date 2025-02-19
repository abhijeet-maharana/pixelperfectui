import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';

const POSTS_PER_PAGE = 9;

export function useBlogData() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch featured posts and categories
  useEffect(() => {
    async function fetchInitialData() {
      try {
        setLoading(true);
        
        // Fetch featured posts
        const { data: featuredData, error: featuredError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:blog_authors(*)
          `)
          .eq('featured', true)
          .order('published_at', { ascending: false })
          .limit(2);
        
        if (featuredError) throw featuredError;

        // Get unique categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_posts')
          .select('category')
          .order('category');
        
        if (categoriesError) throw categoriesError;

        const uniqueCategories = Array.from(
          new Set(categoriesData.map(post => post.category))
        );

        setFeaturedPosts(featuredData);
        setCategories(['All', ...uniqueCategories]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  // Fetch posts with pagination
  const fetchPosts = async (pageNumber: number = 1, category?: string, searchQuery?: string) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          author:blog_authors(*)
        `, { count: 'exact' })
        .eq('featured', false)
        .order('published_at', { ascending: false });

      // Apply category filter
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      // Apply search filter
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      // Apply pagination
      const from = (pageNumber - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      
      const { data, error, count } = await query.range(from, to);
      
      if (error) throw error;

      if (count) {
        setHasMore(from + data.length < count);
      }

      if (pageNumber === 1) {
        setPosts(data);
      } else {
        setPosts(prev => [...prev, ...data]);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Reset and load first page
  const resetPosts = (category?: string, searchQuery?: string) => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
    fetchPosts(1, category, searchQuery);
  };

  // Load more posts
  const loadMore = async (category?: string, searchQuery?: string) => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchPosts(nextPage, category, searchQuery);
    }
  };

  return {
    posts,
    featuredPosts,
    categories,
    loading,
    error,
    hasMore,
    resetPosts,
    loadMore
  };
}