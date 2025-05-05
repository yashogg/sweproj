// Helper functions for working with localStorage

/**
 * Get data from localStorage
 */
export const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Save data to localStorage
 */
export const setLocalData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Initialize local storage with some mock data for testing
 */
export const initializeLocalData = (): void => {
  // Add logic here to populate localStorage with initial data if needed
  console.log('Initializing local storage data...');
  
  // You can add logic to check if data already exists before initializing
  const movies = getLocalData('movies', null);
  if (!movies) {
    // Initialize movies data
    // setLocalData('movies', initialMovies);
    console.log('Movies data initialized');
  }
};
