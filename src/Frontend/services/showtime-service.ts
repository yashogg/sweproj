
import { Showtime, ShowtimeWithDetails } from './types';
import { getLocalData } from './local-storage-service';
import { getMovieById } from './movie-service';
import { getTheaterById } from './theater-service';

export async function getShowtimes(movieId: string): Promise<ShowtimeWithDetails[]> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    
    // Filter showtimes for the specified movie
    const filteredShowtimes = showtimes.filter(showtime => showtime.movie_id === movieId);
    
    // Sort showtimes by date and time
    filteredShowtimes.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
    
    // Enhance showtimes with additional details
    const showtimesWithDetails = await Promise.all(
      filteredShowtimes.map(async (showtime) => {
        const theater = await getTheaterById(showtime.theater_id);
        return {
          ...showtime,
          theater: theater || undefined
        };
      })
    );
    
    return showtimesWithDetails;
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    return [];
  }
}

export async function getShowtimeById(id: string): Promise<ShowtimeWithDetails | null> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    const showtime = showtimes.find(showtime => showtime.id === id);
    
    if (!showtime) {
      return null;
    }
    
    // Get the movie and theater details
    const [movie, theater] = await Promise.all([
      getMovieById(showtime.movie_id),
      getTheaterById(showtime.theater_id)
    ]);
    
    return {
      ...showtime,
      movie: movie || undefined,
      theater: theater || undefined
    };
  } catch (error) {
    console.error('Error fetching showtime:', error);
    return null;
  }
}

export async function getShowtimesByTheater(theaterId: string): Promise<ShowtimeWithDetails[]> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    
    // Filter showtimes for the specified theater
    const filteredShowtimes = showtimes.filter(showtime => showtime.theater_id === theaterId);
    
    // Enhance showtimes with additional details
    const showtimesWithDetails = await Promise.all(
      filteredShowtimes.map(async (showtime) => {
        const movie = await getMovieById(showtime.movie_id);
        return {
          ...showtime,
          movie: movie || undefined
        };
      })
    );
    
    return showtimesWithDetails;
  } catch (error) {
    console.error('Error fetching showtimes by theater:', error);
    return [];
  }
}
