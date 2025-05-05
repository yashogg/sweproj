
import { Movie, MovieWithShowtimes } from './types';
import { getLocalData } from './local-storage-service';

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
