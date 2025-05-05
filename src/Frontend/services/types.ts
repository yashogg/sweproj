
// Helper types for our data
export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string | null;
  image_path: string | null;
  rating: number | null;
  release_date: string | null;
  genre: string | null;
  cast_members: string | null;
  duration: number | null;
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  created_at: string;
  updated_at: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  seats_capacity: number;
  created_at: string;
}

export interface Showtime {
  id: string;
  movie_id: string;
  theater_id: string;
  date: string;
  time: string;
  price: number;
  available_seats: number;
  created_at: string;
  movie?: Movie;
  theater?: Theater;
}

export interface Order {
  id: string;
  user_id: string | null;
  showtime_id: string;
  seats: number;
  total_amount: number;
  order_date: string;
  payment_status: 'Pending' | 'Completed' | 'Failed' | null;
}

export interface Review {
  id: string;
  movie_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

// Extended types with related data
export interface MovieWithShowtimes extends Movie {
  showtimes?: Showtime[];
}

export interface ShowtimeWithDetails extends Showtime {
  movie?: Movie;
  theater?: Theater;
}

export interface OrderWithDetails extends Order {
  showtime?: ShowtimeWithDetails;
}

// UI specific interfaces for the review components
export interface ReviewItem {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
