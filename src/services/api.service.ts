
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
  
  // Ensure admin account is created
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const adminExists = users.some((user: any) => user.email === 'admin@ticketeer.com');
  
  if (!adminExists) {
    users.push({
      id: 'admin1',
      email: 'admin@ticketeer.com',
      name: 'Admin User',
      password: 'admin', // In a real app, this would be hashed
      isAdmin: true
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
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
    isAdmin: email === 'admin@ticketeer.com'
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
