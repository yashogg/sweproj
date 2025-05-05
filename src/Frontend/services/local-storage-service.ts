
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

// Generate a simple UUID for ids
export function generateId(): string {
  return 'id_' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
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

  // Initialize movies if they don't exist
  if (!localStorage.getItem('movies')) {
    setLocalData('movies', [...NOW_PLAYING, ...UPCOMING]);
  }
}

// Sample data for now playing movies
export const NOW_PLAYING = [
  { 
    id: "1", 
    title: "Inception", 
    image_path: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", 
    rating: 8.8,
    release_date: "2025-04-15",
    description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
    genre: "Sci-Fi/Action",
    cast_members: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
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
    status: "Now Playing",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "3", 
    title: "The Dark Knight", 
    image_path: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", 
    rating: 9.0,
    release_date: "2025-04-01",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action/Crime",
    cast_members: "Christian Bale, Heath Ledger, Aaron Eckhart",
    status: "Now Playing",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "4", 
    title: "Pulp Fiction", 
    image_path: "https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", 
    rating: 8.9,
    release_date: "2025-04-10",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime/Drama",
    cast_members: "John Travolta, Uma Thurman, Samuel L. Jackson",
    status: "Now Playing",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Sample data for upcoming movies
export const UPCOMING = [
  { 
    id: "5", 
    title: "Dune: Part Two", 
    image_path: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", 
    rating: 8.5,
    release_date: "2025-06-15",
    description: "The sequel to the critically acclaimed sci-fi epic that continues the journey of Paul Atreides as he unites with the Fremen to seek revenge against the conspirators who destroyed his family.",
    genre: "Sci-Fi/Adventure",
    cast_members: "Timothée Chalamet, Rebecca Ferguson, Zendaya",
    status: "Upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "6", 
    title: "The Batman", 
    image_path: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", 
    rating: 8.4,
    release_date: "2025-05-25",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    genre: "Action/Crime",
    cast_members: "Robert Pattinson, Zoë Kravitz, Paul Dano",
    status: "Upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "7", 
    title: "Black Panther 2", 
    image_path: "https://image.tmdb.org/t/p/w300/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", 
    rating: 7.9,
    release_date: "2025-07-10",
    description: "The sequel to the groundbreaking superhero film Black Panther continues the legacy of Wakanda and its protector.",
    genre: "Action/Adventure",
    cast_members: "Letitia Wright, Lupita Nyong'o, Danai Gurira",
    status: "Upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "8", 
    title: "Avatar 3", 
    image_path: "https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", 
    rating: 8.2,
    release_date: "2025-08-01",
    description: "The third installment in the Avatar franchise continues the exploration of Pandora and the conflict between humans and the Na'vi.",
    genre: "Sci-Fi/Adventure",
    cast_members: "Sam Worthington, Zoe Saldana, Kate Winslet",
    status: "Upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

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
  // Additional showtimes for other movies
  {
    id: "st3",
    movie_id: "2",
    theater_id: "theater1",
    date: "2025-05-25",
    time: "14:00",
    price: 12.99,
    available_seats: 110,
    created_at: new Date().toISOString(),
    movie: {
      id: "2",
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      image_path: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      rating: 9.3,
      release_date: "2025-03-20",
      genre: "Drama",
      cast_members: "Tim Robbins, Morgan Freeman",
      status: "Now Playing",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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
    id: "st4",
    movie_id: "3",
    theater_id: "theater3",
    date: "2025-05-26",
    time: "19:30",
    price: 13.99,
    available_seats: 90,
    created_at: new Date().toISOString(),
    movie: {
      id: "3",
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      image_path: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 9.0,
      release_date: "2025-04-01",
      genre: "Action/Crime",
      cast_members: "Christian Bale, Heath Ledger, Aaron Eckhart",
      status: "Now Playing",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    theater: {
      id: "theater3",
      name: "Levelland",
      location: "789 Third St, Levelland, TX",
      seats_capacity: 90,
      created_at: "2023-01-01T00:00:00Z"
    }
  }
];
