
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
  // Initialize movies if they don't exist
  if (!localStorage.getItem('movies')) {
    const NOW_PLAYING = [
      { 
        id: "1", 
        title: "Inception", 
        image_path: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", 
        rating: 8.8,
        release_date: "2025-04-15",
        description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
        genre: "Sci-Fi/Action",
        cast_members: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        duration: 148,
        status: "Now Playing",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: "2", 
        title: "The Shawshank Redemption", 
        image_path: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", 
        rating: 9.3,
        release_date: "2025-03-20", 
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama",
        cast_members: "Tim Robbins, Morgan Freeman",
        duration: 142,
        status: "Now Playing",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    const UPCOMING = [
      { 
        id: "3", 
        title: "Dune: Part Two", 
        image_path: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", 
        rating: 8.5,
        release_date: "2025-06-15",
        description: "The sequel to the critically acclaimed sci-fi epic that continues the journey of Paul Atreides as he unites with the Fremen to seek revenge against the conspirators who destroyed his family.",
        genre: "Sci-Fi/Adventure",
        cast_members: "Timothée Chalamet, Rebecca Ferguson, Zendaya",
        duration: 166,
        status: "Upcoming",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: "4", 
        title: "The Batman", 
        image_path: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", 
        rating: 8.4,
        release_date: "2025-05-25",
        description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        genre: "Action/Crime",
        cast_members: "Robert Pattinson, Zoë Kravitz, Paul Dano",
        duration: 176,
        status: "Upcoming",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    setLocalData('movies', [...NOW_PLAYING, ...UPCOMING]);
    console.log('Movies data initialized');
  }
  
  // Initialize theaters if they don't exist
  if (!localStorage.getItem('theaters')) {
    const theaters = [
      {
        id: "theater1",
        name: "Lubbock",
        location: "123 Main St, Lubbock, TX",
        seats_capacity: 150,
        created_at: new Date().toISOString()
      },
      {
        id: "theater2",
        name: "Amarillo",
        location: "456 Second St, Amarillo, TX",
        seats_capacity: 120,
        created_at: new Date().toISOString()
      },
      {
        id: "theater3",
        name: "Levelland",
        location: "789 Third St, Levelland, TX",
        seats_capacity: 90,
        created_at: new Date().toISOString()
      }
    ];
    setLocalData('theaters', theaters);
  }
  
  // Initialize showtimes if they don't exist
  if (!localStorage.getItem('showtimes')) {
    const showtimes = [
      {
        id: "st1",
        movie_id: "1",
        theater_id: "theater1",
        date: "2025-05-25",
        time: "13:30",
        price: 12.99,
        available_seats: 120,
        created_at: new Date().toISOString()
      },
      {
        id: "st2",
        movie_id: "1",
        theater_id: "theater2",
        date: "2025-05-25",
        time: "16:00",
        price: 14.99,
        available_seats: 100,
        created_at: new Date().toISOString()
      },
      {
        id: "st3",
        movie_id: "2",
        theater_id: "theater3",
        date: "2025-05-26",
        time: "18:30",
        price: 13.99,
        available_seats: 80,
        created_at: new Date().toISOString()
      },
      {
        id: "st4",
        movie_id: "3",
        theater_id: "theater1",
        date: "2025-12-20",
        time: "14:00",
        price: 15.99,
        available_seats: 150,
        created_at: new Date().toISOString()
      }
    ];
    setLocalData('showtimes', showtimes);
  }
  
  // Initialize reviews if they don't exist
  if (!localStorage.getItem('reviews')) {
    const reviews = [
      {
        id: "rev1",
        movie_id: "1",
        user_id: "user1",
        rating: 9,
        comment: "Absolutely loved it! The concept was executed perfectly.",
        created_at: new Date().toISOString()
      },
      {
        id: "rev2",
        movie_id: "1",
        user_id: "user2",
        rating: 10,
        comment: "Best movie ever. The visuals were amazing.",
        created_at: new Date().toISOString()
      },
      {
        id: "rev3",
        movie_id: "2",
        user_id: "user1",
        rating: 8,
        comment: "A classic that still holds up today.",
        created_at: new Date().toISOString()
      }
    ];
    setLocalData('reviews', reviews);
  }
  
  // Initialize profiles if they don't exist
  if (!localStorage.getItem('profiles')) {
    const profiles = [
      {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        phone: null,
        address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: null,
        address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    setLocalData('profiles', profiles);
  }
  
  // Initialize orders if they don't exist
  if (!localStorage.getItem('orders')) {
    setLocalData('orders', []);
  }
};
