
import { Movie, User, Order, ShowtimeWithDetails } from './types';

// API base URL - change this based on your environment
const API_URL = 'http://localhost:3001/api';

// Fallback to localStorage if API is not available
const useLocalStorage = true; // Set to false when backend is ready

// Helper function to initialize local storage with sample data
export const initializeLocalData = () => {
  if (!localStorage.getItem('movies')) {
    const sampleMovies = [
      {
        id: '1',
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        image_path: 'https://via.placeholder.com/300x450',
        release_date: '2025-01-15',
        duration: 152,
        genre: 'Action/Drama',
        cast_members: 'Christian Bale as Batman, Heath Ledger as Joker',
        status: 'Now Playing',
        rating: 9.0
      },
      {
        id: '2',
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        image_path: 'https://via.placeholder.com/300x450',
        release_date: '2025-02-20',
        duration: 148,
        genre: 'Sci-Fi/Action',
        cast_members: 'Leonardo DiCaprio as Cobb, Joseph Gordon-Levitt as Arthur',
        status: 'Upcoming',
        rating: 8.8
      }
    ];
    localStorage.setItem('movies', JSON.stringify(sampleMovies));
  }
  
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      {
        id: '1',
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
        isAdmin: false
      },
      {
        id: '2',
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        isAdmin: true
      }
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }
  
  if (!localStorage.getItem('showtimes')) {
    const sampleShowtimes = [
      {
        id: '1',
        movieId: '1',
        date: '2025-05-10',
        time: '18:00',
        theater: 'Theater 1',
        price: 12,
        availableSeats: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3']
      }
    ];
    localStorage.setItem('showtimes', JSON.stringify(sampleShowtimes));
  }
  
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
};

// Movies API
export const getMovies = async (): Promise<Movie[]> => {
  if (useLocalStorage) {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    return movies;
  }
  
  const response = await fetch(`${API_URL}/movies`);
  return response.json();
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
  if (useLocalStorage) {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    return movies.find((m: Movie) => m.id === id) || null;
  }
  
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) return null;
  return response.json();
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const movies = await getMovies();
  return movies.filter(movie => movie.status === 'Now Playing');
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  const movies = await getMovies();
  return movies.filter(movie => movie.status === 'Upcoming');
};

// Authentication API
export const login = async (email: string, password: string): Promise<User | null> => {
  if (useLocalStorage) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) return null;
    
    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) return null;
  const data = await response.json();
  return data.user;
};

export const register = async (name: string, email: string, password: string): Promise<User | null> => {
  if (useLocalStorage) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      return null;
    }
    
    const newUser = { id: Date.now().toString(), email, password, name, isAdmin: false };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Don't return password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  
  if (!response.ok) return null;
  const data = await response.json();
  return data.user;
};

// Showtimes API
export const getShowtimes = async (movieId: string): Promise<ShowtimeWithDetails[]> => {
  if (useLocalStorage) {
    const showtimes = JSON.parse(localStorage.getItem('showtimes') || '[]');
    return showtimes.filter((s: any) => s.movieId === movieId);
  }
  
  const response = await fetch(`${API_URL}/showtimes/${movieId}`);
  return response.json();
};

// Orders API
export const createOrder = async (order: Omit<Order, 'id' | 'date'>): Promise<Order | null> => {
  if (useLocalStorage) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...order
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  }
  
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  
  if (!response.ok) return null;
  return response.json();
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  if (useLocalStorage) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter((o: any) => o.userId === userId);
  }
  
  const response = await fetch(`${API_URL}/orders/${userId}`);
  return response.json();
};
