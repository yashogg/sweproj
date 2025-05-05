
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
        imagePath: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", 
        rating: 8.8,
        releaseDate: "2025-04-15",
        description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
        genre: "Sci-Fi/Action",
        castMembers: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        duration: 148,
        status: "Now Playing"
      },
      { 
        id: "2", 
        title: "The Shawshank Redemption", 
        imagePath: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", 
        rating: 9.3,
        releaseDate: "2025-03-20", 
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama",
        castMembers: "Tim Robbins, Morgan Freeman",
        duration: 142,
        status: "Now Playing"
      }
    ];
    
    const UPCOMING = [
      { 
        id: "3", 
        title: "Dune: Part Two", 
        imagePath: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", 
        rating: 8.5,
        releaseDate: "2025-06-15",
        description: "The sequel to the critically acclaimed sci-fi epic that continues the journey of Paul Atreides as he unites with the Fremen to seek revenge against the conspirators who destroyed his family.",
        genre: "Sci-Fi/Adventure",
        castMembers: "Timothée Chalamet, Rebecca Ferguson, Zendaya",
        duration: 166,
        status: "Upcoming"
      },
      { 
        id: "4", 
        title: "The Batman", 
        imagePath: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", 
        rating: 8.4,
        releaseDate: "2025-05-25",
        description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        genre: "Action/Crime",
        castMembers: "Robert Pattinson, Zoë Kravitz, Paul Dano",
        duration: 176,
        status: "Upcoming"
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
        seatsCapacity: 150
      },
      {
        id: "theater2",
        name: "Amarillo",
        location: "456 Second St, Amarillo, TX",
        seatsCapacity: 120
      },
      {
        id: "theater3",
        name: "Levelland",
        location: "789 Third St, Levelland, TX",
        seatsCapacity: 90
      }
    ];
    setLocalData('theaters', theaters);
  }
  
  // Initialize showtimes if they don't exist
  if (!localStorage.getItem('showtimes')) {
    const showtimes = [
      {
        id: "st1",
        movieId: "1",
        theaterId: "theater1",
        theaterName: "Lubbock",
        date: "2025-05-25",
        time: "13:30",
        price: 12.99,
        availableSeats: 120
      },
      {
        id: "st2",
        movieId: "1",
        theaterId: "theater2",
        theaterName: "Amarillo",
        date: "2025-05-25",
        time: "16:00",
        price: 14.99,
        availableSeats: 100
      },
      {
        id: "st3",
        movieId: "2",
        theaterId: "theater3",
        theaterName: "Levelland",
        date: "2025-05-26",
        time: "18:30",
        price: 13.99,
        availableSeats: 80
      },
      {
        id: "st4",
        movieId: "3",
        theaterId: "theater1",
        theaterName: "Lubbock",
        date: "2025-12-20",
        time: "14:00",
        price: 15.99,
        availableSeats: 150
      }
    ];
    setLocalData('showtimes', showtimes);
  }
  
  // Initialize reviews if they don't exist
  if (!localStorage.getItem('reviews')) {
    const reviews = [
      {
        id: "rev1",
        movieId: "1",
        userId: "user1",
        rating: 9,
        comment: "Absolutely loved it! The concept was executed perfectly.",
        date: new Date().toISOString()
      },
      {
        id: "rev2",
        movieId: "1",
        userId: "user2",
        rating: 10,
        comment: "Best movie ever. The visuals were amazing.",
        date: new Date().toISOString()
      },
      {
        id: "rev3",
        movieId: "2",
        userId: "user1",
        rating: 8,
        comment: "A classic that still holds up today.",
        date: new Date().toISOString()
      }
    ];
    setLocalData('reviews', reviews);
  }
  
  // Initialize users if they don't exist
  if (!localStorage.getItem('users')) {
    const users = [
      {
        id: "user1",
        name: "Admin User",
        email: "admin@ticketeer.com",
        isAdmin: true,
        phone: "555-123-4567",
        address: "123 Admin St."
      },
      {
        id: "user2",
        name: "Regular User",
        email: "user@example.com",
        isAdmin: false
      }
    ];
    setLocalData('users', users);
  }
  
  // Initialize orders if they don't exist
  if (!localStorage.getItem('orders')) {
    setLocalData('orders', []);
  }
};
