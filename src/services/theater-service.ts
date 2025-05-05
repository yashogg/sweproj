
import { Theater } from './types';
import { getLocalData } from './local-storage-service';

export async function getAllTheaters(): Promise<Theater[]> {
  try {
    const theaters = getLocalData<Theater[]>('theaters', []);
    return theaters;
  } catch (error) {
    console.error('Error fetching theaters:', error);
    return [];
  }
}

export async function getTheaterById(id: string): Promise<Theater | null> {
  try {
    const theaters = getLocalData<Theater[]>('theaters', []);
    return theaters.find(theater => theater.id === id) || null;
  } catch (error) {
    console.error('Error fetching theater by ID:', error);
    return null;
  }
}
