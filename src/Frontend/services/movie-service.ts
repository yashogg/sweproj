
import { Movie, MovieWithShowtimes } from './types';
import { getLocalData, setLocalData } from './local-storage-service';

export async function getAllMovies(): Promise<Movie[]> {
  const movies = getLocalData<Movie[]>('movies', []);
  return movies;
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
  const movies = getLocalData<Movie[]>('movies', []);
  return movies.filter(movie => movie.status === 'Now Playing');
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const movies = getLocalData<Movie[]>('movies', []);
  return movies.filter(movie => movie.status === 'Upcoming');
}

export async function getMovieById(id: string): Promise<MovieWithShowtimes | null> {
  const movies = getLocalData<Movie[]>('movies', []);
  const movie = movies.find(m => m.id === id);
  
  if (!movie) return null;
  
  // Get showtimes for this movie from local storage
  const showtimes = getLocalData('showtimes', []);
  const movieShowtimes = showtimes.filter(
    s => s.movie_id === id && new Date(s.date) >= new Date()
  );
  
  return {
    ...movie,
    showtimes: movieShowtimes
  };
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const movies = getLocalData<Movie[]>('movies', []);
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
}

export async function addMovie(movie: Omit<Movie, 'id' | 'created_at' | 'updated_at'>): Promise<Movie> {
  const movies = getLocalData<Movie[]>('movies', []);
  
  const newMovie: Movie = {
    ...movie,
    id: `movie_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  movies.push(newMovie);
  setLocalData('movies', movies);
  
  return newMovie;
}

export async function updateMovie(id: string, updates: Partial<Movie>): Promise<Movie> {
  const movies = getLocalData<Movie[]>('movies', []);
  const index = movies.findIndex(m => m.id === id);
  
  if (index === -1) {
    throw new Error(`Movie with ID ${id} not found`);
  }
  
  const updatedMovie = {
    ...movies[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  movies[index] = updatedMovie;
  setLocalData('movies', movies);
  
  return updatedMovie;
}

export async function deleteMovie(id: string): Promise<void> {
  const movies = getLocalData<Movie[]>('movies', []);
  const updatedMovies = movies.filter(m => m.id !== id);
  setLocalData('movies', updatedMovies);
}
