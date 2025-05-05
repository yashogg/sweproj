
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
  imagePath?: string; // Changed from image_path to camelCase
  releaseDate?: string; // Changed from release_date to camelCase
  duration?: number;
  genre?: string;
  castMembers?: string; // Changed from cast_members to camelCase
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  rating?: number;
}

export interface MovieWithShowtimes extends Movie {
  showtimes?: ShowtimeWithDetails[];
}

// Showtime types
export interface Showtime {
  id: string;
  movieId: string; // Consistently using camelCase
  date: string;
  time: string;
  theater: string;
  price: number;
  availableSeats: number | string[]; // Handle both number of seats or array of seat IDs
}

export interface ShowtimeWithDetails extends Showtime {
  movie?: Movie;
  theater?: Theater;
}

// Theater type
export interface Theater {
  id: string;
  name: string;
  location: string;
  seatsCapacity: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  movieId: string;
  movieTitle: string;
  showtime: string;
  showtimeId: string;
  date: string;
  theater: string;
  seats: number;
  totalPrice: number;
  orderDate?: string;
  paymentStatus?: 'Completed' | 'Pending' | 'Failed';
}

export interface OrderWithDetails extends Order {
  showtime?: ShowtimeWithDetails;
}

// Review types
export interface Review {
  id: string;
  movieId: string; // Changed from movie_id to camelCase
  userId: string; // Changed from user_id to camelCase
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
