
import BookingForm from './BookingForm';
import MovieInfo from './MovieInfo';
import { ShowtimeWithDetails } from '../../services/types';

interface MovieSidebarProps {
  movieId: string;
  movieTitle: string;
  isUpcoming: boolean;
  showtimes: ShowtimeWithDetails[];
  director: string;
  studios: string[];
}

const MovieSidebar = ({
  movieId,
  movieTitle,
  isUpcoming,
  showtimes,
  director,
  studios
}: MovieSidebarProps) => {
  return (
    <div className="md:w-1/3">
      {/* Ticket Booking Section */}
      <BookingForm 
        movieId={movieId} 
        movieTitle={movieTitle} 
        isUpcoming={isUpcoming}
        showtimes={showtimes}
      />

      <MovieInfo 
        director={director}
        studios={studios}
      />
    </div>
  );
};

export default MovieSidebar;
