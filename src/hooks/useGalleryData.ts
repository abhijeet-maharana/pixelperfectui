import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category, Style, Industry, Design } from '@/lib/types';

const ITEMS_PER_PAGE = 12;

export function useGalleryData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch metadata (categories, styles, industries)
  useEffect(() => {
    async function fetchMetadata() {
      try {
        setLoading(true);
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (categoriesError) throw categoriesError;
        
        // Fetch styles
        const { data: stylesData, error: stylesError } = await supabase
          .from('styles')
          .select('*')
          .order('name');
        
        if (stylesError) throw stylesError;
        
        // Fetch industries
        const { data: industriesData, error: industriesError } = await supabase
          .from('industries')
          .select('*')
          .order('name');
        
        if (industriesError) throw industriesError;

        setCategories(categoriesData);
        setStyles(stylesData);
        setIndustries(industriesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, []);

  // Fetch designs with pagination
  const fetchDesigns = async (pageNumber: number = 1) => {
    try {
      setLoading(true);
      
      const from = (pageNumber - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data: designsData, error: designsError, count } = await supabase
        .from('designs')
        .select(`
          *,
          category:categories(*),
          style:styles(*),
          industry:industries(*)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (designsError) throw designsError;

      if (count) {
        setHasMore(from + designsData.length < count);
      }

      if (pageNumber === 1) {
        setDesigns(designsData);
      } else {
        setDesigns(prev => [...prev, ...designsData]);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDesigns(1);
  }, []);

  const loadMore = async () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchDesigns(nextPage);
    }
  };

  return {
    categories,
    styles,
    industries,
    designs,
    loading,
    error,
    hasMore,
    loadMore
  };
}