
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
  theaterId: string;
  theaterName: string;
  price: number;
  availableSeats: number | string[];
}

export interface ShowtimeWithDetails {
  id: string;
  movieId: string;
  date: string;
  time: string;
  theaterId?: string;
  theaterName?: string;
  theater?: Theater;
  price: number;
  availableSeats: number | string[];
  movie?: Movie;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  movieId: string;
  movieTitle: string;
  showtimeId: string;
  date: string;
  theater: string; // Theater name string
  seats: number;
  totalPrice: number;
  orderDate?: string;
  paymentStatus?: 'Completed' | 'Pending' | 'Failed';
}

export interface OrderWithDetails extends Order {
  showtimeDetails?: ShowtimeWithDetails;
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
