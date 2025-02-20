import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { BlogPost, Comment } from "@/lib/types";

export function useBlogPost(postId: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);

        // Fetch post with author
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select(
            `
            *,
            author:blog_authors(*)
          `
          )
          .eq("id", postId)
          .single();

        if (postError) throw postError;

        // Fetch comments
        const { data: commentsData, error: commentsError } = await supabase
          .from("blog_comments")
          .select("*")
          .eq("post_id", postId)
          .order("created_at", { ascending: true });

        if (commentsError) throw commentsError;

        setPost(postData);
        setComments(commentsData || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setPost(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const addComment = async (comment: {
    author_name: string;
    author_email: string;
    content: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from("blog_comments")
        .insert([
          {
            post_id: postId,
            ...comment,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setComments((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to add comment",
      };
    }
  };

  return {
    post,
    comments,
    loading,
    error,
    addComment,
  };
}
