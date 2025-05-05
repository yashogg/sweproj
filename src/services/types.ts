
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

// Movie types
export interface Movie {
  id: string;
  title: string;
  description?: string;
  image_path?: string;
  release_date?: string;
  duration?: number;
  genre?: string;
  cast_members?: string;
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  rating?: number;
}

export interface MovieWithShowtimes extends Movie {
  showtimes?: ShowtimeWithDetails[];
}

// Showtime types
export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  theater: string;
  price: number;
  availableSeats: string[];
}

export interface ShowtimeWithDetails extends Showtime {
  movie?: Movie;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  movieId: string;
  movieTitle: string;
  date: string;
  showtime: string;
  theater: string;
  seats: string[];
  totalPrice: number;
}

// Review types
export interface Review {
  id: number;
  user: string;
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
