
import { supabase } from '@/integrations/supabase/client';
import { Movie, MovieWithShowtimes, Showtime } from './supabase-types';

export async function getAllMovies(): Promise<Movie[]> {
  const { data, error } = await supabase.from('movies').select('*');
  
  if (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
  
  return data as Movie[];
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('status', 'Now Playing');
  
  if (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
  
  return data as Movie[];
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('status', 'Upcoming');
  
  if (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
  
  return data as Movie[];
}

export async function getMovieById(id: string): Promise<MovieWithShowtimes | null> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
  
  if (!data) return null;
  
  // Get showtimes for this movie
  const movie = data as MovieWithShowtimes;
  
  const { data: showtimes, error: showtimesError } = await supabase
    .from('showtimes')
    .select('*, theaters(*)')
    .eq('movie_id', id)
    .gte('date', new Date().toISOString().split('T')[0]); // Only future showtimes
  
  if (showtimesError) {
    console.error('Error fetching showtimes:', showtimesError);
  } else {
    movie.showtimes = showtimes as Showtime[];
  }
  
  return movie;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .ilike('title', `%${query}%`);
  
  if (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
  
  return data as Movie[];
}

export async function addMovie(movie: Omit<Movie, 'id' | 'created_at' | 'updated_at'>): Promise<Movie> {
  const { data, error } = await supabase
    .from('movies')
    .insert([movie])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
  
  return data as Movie;
}

export async function updateMovie(id: string, updates: Partial<Movie>): Promise<Movie> {
  const { data, error } = await supabase
    .from('movies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
  
  return data as Movie;
}

export async function deleteMovie(id: string): Promise<void> {
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}

// Migrate sample movie data from our local data to Supabase
export async function migrateMovieData(movies: any[]): Promise<void> {
  // First check if we already have movies
  const { count, error: countError } = await supabase
    .from('movies')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking existing movies:', countError);
    return;
  }
  
  // If we already have movies, don't insert
  if (count && count > 0) {
    console.log('Movies already exist in the database, skipping migration');
    return;
  }
  
  // Format the movie data to match our schema
  const formattedMovies = movies.map(movie => ({
    title: movie.title,
    description: movie.description || null,
    image_path: movie.imagePath || null,
    rating: movie.rating || null,
    release_date: movie.releaseDate || null,
    genre: movie.genre || null,
    cast_members: movie.cast || null,
    duration: null, // We don't have this in sample data
    status: movie.status || 'Upcoming'
  }));
  
  // Insert the movies
  const { error } = await supabase
    .from('movies')
    .insert(formattedMovies);
  
  if (error) {
    console.error('Error migrating movies:', error);
    throw error;
  }
  
  console.log('Successfully migrated movie data to Supabase');
}
