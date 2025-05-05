
import { Showtime, ShowtimeWithDetails } from './supabase-types';
import { getLocalData, setLocalData, initializeLocalData } from './local-storage-service';

// Initialize local data if needed
initializeLocalData();

export async function getShowtimes(movieId?: string): Promise<ShowtimeWithDetails[]> {
  try {
    const showtimes = getLocalData<ShowtimeWithDetails[]>('showtimes', []);
    
    // Filter by movie ID if provided and only return future showtimes
    const today = new Date().toISOString().split('T')[0];
    const filteredShowtimes = showtimes.filter(showtime => {
      const isInFuture = showtime.date >= today;
      return isInFuture && (!movieId || showtime.movie_id === movieId);
    });
    
    return filteredShowtimes;
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    throw error;
  }
}

export async function getShowtimeById(id: string): Promise<ShowtimeWithDetails | null> {
  try {
    const showtimes = getLocalData<ShowtimeWithDetails[]>('showtimes', []);
    const showtime = showtimes.find(s => s.id === id) || null;
    return showtime;
  } catch (error) {
    console.error('Error fetching showtime:', error);
    return null;
  }
}

export async function addShowtime(showtime: Omit<Showtime, 'id' | 'created_at'>): Promise<Showtime> {
  try {
    const showtimes = getLocalData<ShowtimeWithDetails[]>('showtimes', []);
    
    // Generate a new ID
    const newId = `st_${Date.now()}`;
    
    // Create the new showtime
    const newShowtime = {
      ...showtime,
      id: newId,
      created_at: new Date().toISOString()
    };
    
    // Add to showtimes
    showtimes.push(newShowtime as ShowtimeWithDetails);
    setLocalData('showtimes', showtimes);
    
    return newShowtime;
  } catch (error) {
    console.error('Error adding showtime:', error);
    throw error;
  }
}

export async function updateShowtime(id: string, updates: Partial<Showtime>): Promise<Showtime> {
  try {
    const showtimes = getLocalData<ShowtimeWithDetails[]>('showtimes', []);
    
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
    const showtimes = getLocalData<ShowtimeWithDetails[]>('showtimes', []);
    
    // Filter out the showtime to delete
    const updatedShowtimes = showtimes.filter(s => s.id !== id);
    setLocalData('showtimes', updatedShowtimes);
  } catch (error) {
    console.error('Error deleting showtime:', error);
    throw error;
  }
}
