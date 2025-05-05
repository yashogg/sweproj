
import { Movie, MovieWithShowtimes } from './types';
import { getLocalData, setLocalData, generateId } from './local-storage-service';

export async function getAllMovies(): Promise<Movie[]> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    return movies.find(movie => movie.id === id) || null;
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return null;
  }
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    return movies.filter(movie => movie.status === 'Now Playing');
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    return movies.filter(movie => movie.status === 'Upcoming');
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
}

export async function getMovieWithShowtimes(id: string): Promise<MovieWithShowtimes | null> {
  try {
    const movie = await getMovieById(id);
    
    if (!movie) {
      return null;
    }
    
    const showtimes = getLocalData('showtimes', [])
      .filter(showtime => showtime.movie_id === id);
    
    return {
      ...movie,
      showtimes
    };
  } catch (error) {
    console.error('Error fetching movie with showtimes:', error);
    return null;
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

export async function addMovie(movie: Omit<Movie, 'id' | 'created_at' | 'updated_at'>): Promise<Movie> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    
    const newMovie: Movie = {
      ...movie,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    movies.push(newMovie);
    setLocalData('movies', movies);
    
    return newMovie;
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
}

export async function updateMovie(id: string, updates: Partial<Movie>): Promise<Movie> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    const index = movies.findIndex(movie => movie.id === id);
    
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
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
}

export async function deleteMovie(id: string): Promise<void> {
  try {
    const movies = getLocalData<Movie[]>('movies', []);
    const filteredMovies = movies.filter(movie => movie.id !== id);
    
    if (filteredMovies.length === movies.length) {
      throw new Error(`Movie with ID ${id} not found`);
    }
    
    setLocalData('movies', filteredMovies);
    
    // Also remove related showtimes
    const showtimes = getLocalData('showtimes', []);
    const filteredShowtimes = showtimes.filter(showtime => showtime.movie_id !== id);
    setLocalData('showtimes', filteredShowtimes);
    
    // Also remove related reviews
    const reviews = getLocalData('reviews', []);
    const filteredReviews = reviews.filter(review => review.movie_id !== id);
    setLocalData('reviews', filteredReviews);
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}
