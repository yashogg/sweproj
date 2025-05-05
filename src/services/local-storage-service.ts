
// Helper functions for working with localStorage

// Generic function to get data from localStorage
export function getLocalData<T>(key: string, defaultValue: T): T {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      return JSON.parse(storedData) as T;
    } catch (error) {
      console.error(`Error parsing data from localStorage for key ${key}:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
}

// Generic function to set data in localStorage
export function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage for key ${key}:`, error);
  }
}

// Initialize mock data if not already in localStorage
export function initializeLocalData(): void {
  // Initialize showtimes if they don't exist
  if (!localStorage.getItem('showtimes')) {
    setLocalData('showtimes', MOCK_SHOWTIMES);
  }
  
  // Initialize orders if they don't exist
  if (!localStorage.getItem('orders')) {
    setLocalData('orders', []);
  }
  
  // Initialize users if they don't exist
  if (!localStorage.getItem('users')) {
    setLocalData('users', [
      {
        id: 'admin',
        email: 'admin@ticketeer.com',
        name: 'Admin User',
        isAdmin: true
      }
    ]);
  }
}

// Generate a simple UUID for ids
export function generateId(): string {
  return 'id_' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Create mock data for showtimes
export const MOCK_SHOWTIMES = [
  // Spider-Man: No Way Home showtimes
  {
    id: "st1",
    movie_id: "1",
    theater_id: "theater1",
    date: "2025-05-25",
    time: "13:30",
    price: 12.99,
    available_seats: 120,
    created_at: new Date().toISOString(),
    movie: {
      id: "1",
      title: "Spider-Man: No Way Home",
      description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      image_path: "/lovable-uploads/06cfccd8-26cd-4e91-8045-d77d80b03755.png",
      rating: 8.4,
      release_date: "2021-12-17",
      genre: "Action, Adventure, Science Fiction",
      cast_members: "Tom Holland, Zendaya, Benedict Cumberbatch",
      duration: 148,
      status: "Now Playing",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    theater: {
      id: "theater1",
      name: "Lubbock",
      location: "123 Main St, Lubbock, TX",
      seats_capacity: 150,
      created_at: "2023-01-01T00:00:00Z"
    }
  },
  {
    id: "st2",
    movie_id: "1",
    theater_id: "theater2",
    date: "2025-05-25",
    time: "16:00",
    price: 14.99,
    available_seats: 100,
    created_at: new Date().toISOString(),
    movie: {
      id: "1",
      title: "Spider-Man: No Way Home",
      description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      image_path: "/lovable-uploads/06cfccd8-26cd-4e91-8045-d77d80b03755.png",
      rating: 8.4,
      release_date: "2021-12-17",
      genre: "Action, Adventure, Science Fiction",
      cast_members: "Tom Holland, Zendaya, Benedict Cumberbatch",
      duration: 148,
      status: "Now Playing",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    theater: {
      id: "theater2",
      name: "Amarillo",
      location: "456 Second St, Amarillo, TX",
      seats_capacity: 120,
      created_at: "2023-01-01T00:00:00Z"
    }
  },
  {
    id: "st3",
    movie_id: "1",
    theater_id: "theater3",
    date: "2025-05-26",
    time: "18:30",
    price: 13.99,
    available_seats: 80,
    created_at: new Date().toISOString(),
    movie: {
      id: "1",
      title: "Spider-Man: No Way Home",
      description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
      image_path: "/lovable-uploads/06cfccd8-26cd-4e91-8045-d77d80b03755.png",
      rating: 8.4,
      release_date: "2021-12-17",
      genre: "Action, Adventure, Science Fiction",
      cast_members: "Tom Holland, Zendaya, Benedict Cumberbatch",
      duration: 148,
      status: "Now Playing",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    theater: {
      id: "theater3",
      name: "Levelland",
      location: "789 Third St, Levelland, TX",
      seats_capacity: 90,
      created_at: "2023-01-01T00:00:00Z"
    }
  },
  // Dune: Part Two showtimes (upcoming movie)
  {
    id: "st4",
    movie_id: "13",
    theater_id: "theater1",
    date: "2025-12-20",
    time: "14:00",
    price: 15.99,
    available_seats: 150,
    created_at: new Date().toISOString(),
    movie: {
      id: "13",
      title: "Dune: Part Two",
      description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
      image_path: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      rating: 8.5,
      release_date: "2025-12-15",
      genre: "Science Fiction, Adventure",
      cast_members: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
      duration: 166,
      status: "Upcoming",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z"
    },
    theater: {
      id: "theater1",
      name: "Lubbock",
      location: "123 Main St, Lubbock, TX",
      seats_capacity: 150,
      created_at: "2023-01-01T00:00:00Z"
    }
  }
];
