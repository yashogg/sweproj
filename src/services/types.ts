
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  phone?: string;
  address?: string;
}

// Movie types
export interface Movie {
  id: string;
  title: string;
  description?: string;
  imagePath?: string;
  releaseDate?: string;
  duration?: number;
  genre?: string;
  castMembers?: string;
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  rating?: number;
}

export interface MovieWithShowtimes extends Movie {
  showtimes?: ShowtimeWithDetails[];
}

// Theater type
export interface Theater {
  id: string;
  name: string;
  location: string;
  seatsCapacity: number;
}

// Showtime types
export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  theaterId: string; // Changed from theater (string) to theaterId
  theaterName: string; // Added theaterName as string
  price: number;
  availableSeats: number | string[];
}

export interface ShowtimeWithDetails extends Omit<Showtime, 'theaterId'> {
  theaterId?: string;
  theater?: Theater;
  movie?: Movie;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  movieId: string;
  movieTitle: string;
  showtimeId: string;
  showtime: string; // Time display string
  date: string;
  theater: string; // Theater name string
  seats: number;
  totalPrice: number;
  orderDate?: string;
  paymentStatus?: 'Completed' | 'Pending' | 'Failed';
}

export interface OrderWithDetails extends Omit<Order, 'showtime'> {
  showtimeDetails?: ShowtimeWithDetails; // Changed from 'showtime' to avoid type clash
}

// Review types
export interface Review {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReviewItem {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
