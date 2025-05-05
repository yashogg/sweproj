
import { Showtime, ShowtimeWithDetails, Theater } from './types';
import { getLocalData, setLocalData, initializeLocalData } from './local-storage-service';
import { getTheaterById } from './theater-service';

// Initialize local data if needed
initializeLocalData();

export async function getShowtimes(movieId?: string): Promise<ShowtimeWithDetails[]> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    
    // Filter by movie ID if provided and only return future showtimes
    const today = new Date().toISOString().split('T')[0];
    const filteredShowtimes = showtimes.filter(showtime => {
      const isInFuture = showtime.date >= today;
      return isInFuture && (!movieId || showtime.movieId === movieId);
    });
    
    // Convert to ShowtimeWithDetails
    const showtimesWithDetails: ShowtimeWithDetails[] = await Promise.all(
      filteredShowtimes.map(async (showtime) => {
        // Get theater details if available
        let theater: Theater | undefined;
        if (showtime.theaterId) {
          theater = await getTheaterById(showtime.theaterId) || undefined;
        }
        
        return {
          ...showtime,
          theater
        };
      })
    );
    
    return showtimesWithDetails;
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    throw error;
  }
}

export async function getShowtimeById(id: string): Promise<ShowtimeWithDetails | null> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    const showtime = showtimes.find(s => s.id === id);
    
    if (!showtime) {
      return null;
    }
    
    // Get the theater details if available
    let theater: Theater | undefined;
    if (showtime.theaterId) {
      theater = await getTheaterById(showtime.theaterId) || undefined;
    }
    
    // Create the detailed showtime
    const showtimeWithDetails: ShowtimeWithDetails = {
      ...showtime,
      theater
    };
    
    return showtimeWithDetails;
  } catch (error) {
    console.error('Error fetching showtime:', error);
    return null;
  }
}

export async function addShowtime(showtime: Omit<Showtime, 'id'>): Promise<Showtime> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    
    // Generate a new ID
    const newId = `st_${Date.now()}`;
    
    // Create the new showtime
    const newShowtime: Showtime = {
      ...showtime,
      id: newId
    };
    
    // Add to showtimes
    showtimes.push(newShowtime);
    setLocalData('showtimes', showtimes);
    
    return newShowtime;
  } catch (error) {
    console.error('Error adding showtime:', error);
    throw error;
  }
}

export async function updateShowtime(id: string, updates: Partial<Showtime>): Promise<Showtime> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    
    // Find the showtime to update
    const index = showtimes.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Showtime with ID ${id} not found`);
    }
    
    // Update the showtime
    const updatedShowtime = {
      ...showtimes[index],
      ...updates
    };
    
    showtimes[index] = updatedShowtime;
    setLocalData('showtimes', showtimes);
    
    return updatedShowtime;
  } catch (error) {
    console.error('Error updating showtime:', error);
    throw error;
  }
}

export async function deleteShowtime(id: string): Promise<void> {
  try {
    const showtimes = getLocalData<Showtime[]>('showtimes', []);
    
    // Filter out the showtime to delete
    const updatedShowtimes = showtimes.filter(s => s.id !== id);
    setLocalData('showtimes', updatedShowtimes);
  } catch (error) {
    console.error('Error deleting showtime:', error);
    throw error;
  }
}
