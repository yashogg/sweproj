
import { supabase } from '@/integrations/supabase/client';
import { Showtime, ShowtimeWithDetails } from './supabase-types';

export async function getShowtimes(movieId?: string): Promise<ShowtimeWithDetails[]> {
  let query = supabase
    .from('showtimes')
    .select('*, movies(*), theaters(*)')
    .gte('date', new Date().toISOString().split('T')[0]); // Only future showtimes
  
  // If a movie ID is provided, filter showtimes for that movie
  if (movieId) {
    query = query.eq('movie_id', movieId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching showtimes:', error);
    throw error;
  }
  
  return data as ShowtimeWithDetails[];
}

export async function getShowtimeById(id: string): Promise<ShowtimeWithDetails | null> {
  const { data, error } = await supabase
    .from('showtimes')
    .select('*, movies(*), theaters(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching showtime:', error);
    return null;
  }
  
  return data as ShowtimeWithDetails;
}

export async function addShowtime(showtime: Omit<Showtime, 'id' | 'created_at'>): Promise<Showtime> {
  const { data, error } = await supabase
    .from('showtimes')
    .insert([showtime])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding showtime:', error);
    throw error;
  }
  
  return data as Showtime;
}

export async function updateShowtime(id: string, updates: Partial<Showtime>): Promise<Showtime> {
  const { data, error } = await supabase
    .from('showtimes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating showtime:', error);
    throw error;
  }
  
  return data as Showtime;
}

export async function deleteShowtime(id: string): Promise<void> {
  const { error } = await supabase
    .from('showtimes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting showtime:', error);
    throw error;
  }
}
