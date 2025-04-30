
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

// Import our new components
import MovieHero from '@/components/movie-detail/MovieHero';
import BookingForm from '@/components/movie-detail/BookingForm';
import MovieInfo from '@/components/movie-detail/MovieInfo';
import Synopsis from '@/components/movie-detail/Synopsis';
import CastSection from '@/components/movie-detail/CastSection';
import RatingsSection from '@/components/movie-detail/RatingsSection';
import ReviewsSection from '@/components/movie-detail/ReviewsSection';

// Sample movie data
const movieData = {
  id: 1,
  title: "Spider-Man: No Way Home",
  tagline: "The Multiverse unleashed.",
  description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
  poster: "/lovable-uploads/06cfccd8-26cd-4e91-8045-d77d80b03755.png",
  backdrop: "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
  releaseDate: "December 17, 2021",
  duration: "2h 28m",
  genres: ["Action", "Adventure", "Science Fiction"],
  rating: 8.4,
  director: "Jon Watts",
  cast: [
    { name: "Tom Holland", character: "Peter Parker / Spider-Man", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/bBRlrpJm9XkNSg0YT5LCaxqoFk0.jpg" },
    { name: "Zendaya", character: "MJ", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/r3A7ev7QkjOGocVn3kQrJ0eOoAa.jpg" },
    { name: "Benedict Cumberbatch", character: "Dr. Stephen Strange", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/fBEucxECxGLKVHBznO0qHtCGiMO.jpg" },
    { name: "Jacob Batalon", character: "Ned Leeds", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/53YCveE5xL3kCnFdIioXykwCkKb.jpg" },
    { name: "Jon Favreau", character: "Happy Hogan", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/8MqRtDqHZfUSbWxB4nNYOEgCUUX.jpg" }
  ],
  studios: ["Marvel Studios", "Columbia Pictures", "Pascal Pictures"],
  reviews: [
    { id: 1, user: "MovieFan123", rating: 9, comment: "Absolutely loved it! The multiverse concept was executed perfectly.", date: "2021-12-20" },
    { id: 2, user: "ComicBookGuy", rating: 10, comment: "Best Spider-Man movie ever. The callbacks to previous films were amazing.", date: "2021-12-19" },
    { id: 3, user: "CriticEye", rating: 7, comment: "Good, but somewhat predictable. The fan service worked well though.", date: "2021-12-22" }
  ],
  // Added showtimes data for implementation
  showtimes: [
    { id: 1, time: "10:30 AM", date: "2025-05-01" },
    { id: 2, time: "1:45 PM", date: "2025-05-01" },
    { id: 3, time: "5:15 PM", date: "2025-05-01" },
    { id: 4, time: "8:30 PM", date: "2025-05-01" },
    { id: 5, time: "10:30 AM", date: "2025-05-02" },
    { id: 6, time: "1:45 PM", date: "2025-05-02" },
    { id: 7, time: "5:15 PM", date: "2025-05-02" },
    { id: 8, time: "8:30 PM", date: "2025-05-02" }
  ]
};

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState(movieData);
  
  // Simulate loading movie data
  useEffect(() => {
    // In a real app, you would fetch movie by ID here
    console.log(`Loading movie with ID: ${id}`);
  }, [id]);

  return (
    <Layout title={movie.title}>
      {/* Hero Banner */}
      <MovieHero 
        title={movie.title}
        tagline={movie.tagline}
        releaseDate={movie.releaseDate}
        duration={movie.duration}
        genres={movie.genres}
        backdrop={movie.backdrop} // Pass the backdrop image
      />
      
      {/* Movie Details */}
      <section className="container mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Ticket Booking Section */}
            <BookingForm 
              movieId={id || '1'} 
              movieTitle={movie.title} 
              showtimes={movie.showtimes}
            />

            <MovieInfo 
              director={movie.director}
              studios={movie.studios}
            />
          </div>
          
          <div className="md:w-2/3">
            {/* Synopsis */}
            <Synopsis description={movie.description} />
            
            {/* Cast Section */}
            <CastSection cast={movie.cast} />
            
            {/* Ratings */}
            <RatingsSection userRating={movie.rating} />
            
            {/* Reviews Section */}
            <ReviewsSection initialReviews={movie.reviews} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MovieDetail;
