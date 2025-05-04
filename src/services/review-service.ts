
import { supabase } from '@/integrations/supabase/client';
import { Review } from './supabase-types';

export async function getMovieReviews(movieId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(name)')
    .eq('movie_id', movieId);
  
  if (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
  
  return data as Review[];
}

export async function getUserReview(movieId: string, userId: string): Promise<Review | null> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('movie_id', movieId)
    .eq('user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No review found
      return null;
    }
    console.error('Error fetching user review:', error);
    throw error;
  }
  
  return data as Review;
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding review:', error);
    throw error;
  }
  
  return data as Review;
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating review:', error);
    throw error;
  }
  
  return data as Review;
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}
