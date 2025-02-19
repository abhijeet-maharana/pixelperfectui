import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Design } from '@/lib/types';

export function useDesignDetails(id: string) {
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchDesign() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('designs')
          .select(`
            *,
            category:categories(*),
            style:styles(*),
            industry:industries(*)
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setDesign(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setDesign(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDesign();
    }
  }, [id]);

  const toggleLike = async () => {
    if (!design) return;

    try {
      const newLikes = isLiked ? design.likes - 1 : design.likes + 1;
      
      const { error } = await supabase
        .from('designs')
        .update({ likes: newLikes })
        .eq('id', design.id);

      if (error) throw error;

      setDesign(prev => prev ? { ...prev, likes: newLikes } : null);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return {
    design,
    loading,
    error,
    isLiked,
    toggleLike
  };
}