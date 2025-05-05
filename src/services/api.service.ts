
import { Movie, MovieWithShowtimes, Showtime } from './types';
import { initializeLocalData } from './local-storage-service';
import { 
  getAllMovies, 
  getMovieById, 
  getNowPlayingMovies, 
  getUpcomingMovies,
  getMovieWithShowtimes
} from './movie-service';

// Initialize local data on app startup
export const initializeApp = () => {
  initializeLocalData();
};

// Movies API
export const getMovies = getAllMovies;
export const getMovie = getMovieById;
export const getMovieWithDetails = getMovieWithShowtimes;

// Expose showtime functionality through api service
export const getShowtimes = async (movieId: string) => {
  const movieWithShowtimes = await getMovieWithShowtimes(movieId);
  return movieWithShowtimes?.showtimes || [];
};

// Filter functions
export { getNowPlayingMovies, getUpcomingMovies };

// Login and register functions (these will be handled by AuthContext)
export const login = async (email: string, password: string) => {
  // This is just a placeholder that returns a mock user
  // The actual logic is in AuthContext
  return {
    id: 'user1',
    email,
    name: 'Test User',
    isAdmin: email === 'admin@movieapp.com'
  };
};

export const register = async (name: string, email: string, password: string) => {
  // This is just a placeholder that returns a mock user
  // The actual logic is in AuthContext
  return {
    id: `user_${Date.now()}`,
    email,
    name,
    isAdmin: false
  };
};

// Search function
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const movies = await getAllMovies();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};
