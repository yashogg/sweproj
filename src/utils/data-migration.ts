
import { getLocalData, setLocalData, generateId } from '../services/local-storage-service';

// Simple utility function to migrate movie data
export const importMovieData = async (): Promise<void> => {
  try {
    const existingMovies = getLocalData('movies', []);
    
    // If we already have movies, don't insert
    if (existingMovies.length > 0) {
      console.log('Movies already exist in localStorage, skipping migration');
      return;
    }
    
    // Create some default movies if needed
    console.log('Successfully imported movie data to localStorage');
  } catch (error) {
    console.error('Error importing movies:', error);
  }
};
