
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getShowtimes } from '@/services/showtime-service';
import { ShowtimeWithDetails } from '@/services/supabase-types';
import { initializeLocalData } from '@/services/local-storage-service';

// Import our components
import MovieHero from '@/components/movie-detail/MovieHero';
import BookingForm from '@/components/movie-detail/BookingForm';
import MovieInfo from '@/components/movie-detail/MovieInfo';
import Synopsis from '@/components/movie-detail/Synopsis';
import CastSection from '@/components/movie-detail/CastSection';
import RatingsSection from '@/components/movie-detail/RatingsSection';
import ReviewsSection from '@/components/movie-detail/ReviewsSection';

// Initialize mock data
initializeLocalData();

// Sample movie data for now playing
const nowPlayingMovie = {
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
  status: "Now Playing",
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
  // We'll replace this with data from the database
  showtimes: []
};

// Sample movie data for upcoming
const upcomingMovie = {
  id: 13,
  title: "Dune: Part Two",
  tagline: "Long live the fighters.",
  description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
  poster: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  backdrop: "https://image.tmdb.org/t/p/original/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg",
  releaseDate: "December 15, 2025",
  duration: "2h 46m",
  genres: ["Science Fiction", "Adventure"],
  rating: 8.5,
  director: "Denis Villeneuve",
  status: "Upcoming",
  cast: [
    { name: "Timothée Chalamet", character: "Paul Atreides", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/oqhdJAuCKiDQFFz4hL3pTX2FzRM.jpg" },
    { name: "Zendaya", character: "Chani", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/r3A7ev7QkjOGocVn3kQrJ0eOoAa.jpg" },
    { name: "Rebecca Ferguson", character: "Lady Jessica", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/lJloTOheuQSirSLXNA2ISQfG2ie.jpg" },
    { name: "Josh Brolin", character: "Gurney Halleck", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/sX2etBbIkxRaCsATyw5ZpQZSYIx.jpg" },
    { name: "Austin Butler", character: "Feyd-Rautha Harkonnen", photo: "https://image.tmdb.org/t/p/w138_and_h175_face/338Bau1p9zS4CnMfwMR4THSUwNG.jpg" }
  ],
  studios: ["Legendary Pictures", "Warner Bros. Pictures"],
  reviews: [
    { id: 1, user: "SciFiLover", rating: 9, comment: "Can't wait to see this sequel! The first one was incredible.", date: "2023-06-15" },
    { id: 2, user: "BookWorm", rating: 8, comment: "Hope they do justice to the second half of the book.", date: "2023-07-02" }
  ],
  // We'll replace this with data from the database
  showtimes: []
};

const allMovies = [nowPlayingMovie, upcomingMovie];

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState<ShowtimeWithDetails[]>([]);
  
  // Simulate loading movie data
  useEffect(() => {
    // In a real app, you would fetch movie by ID here
    console.log(`Loading movie with ID: ${id}`);
    
    // Find the movie in our sample data
    const foundMovie = allMovies.find(m => m.id === Number(id));
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      // If not found in our samples, use the default
      setMovie(id === '13' ? upcomingMovie : nowPlayingMovie);
    }
    
    // Now fetch actual showtimes if we have a movie ID
    if (id) {
      getShowtimes(id)
        .then(fetchedShowtimes => {
          console.log("Fetched showtimes:", fetchedShowtimes);
          setShowtimes(fetchedShowtimes);
        })
        .catch(error => {
          console.error("Error fetching showtimes:", error);
        });
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ticketeer-purple"></div>
        </div>
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout title="Movie Not Found">
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Movie Not Found</h2>
            <p className="mt-2">Sorry, we couldn't find the movie you're looking for.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const isUpcoming = movie.status === 'Upcoming';

  return (
    <Layout title={movie.title}>
      {/* Hero Banner */}
      <MovieHero 
        title={movie.title}
        tagline={movie.tagline}
        releaseDate={movie.releaseDate}
        duration={movie.duration}
        genres={movie.genres}
        backdrop={movie.backdrop} 
      />
      
      {/* Movie Details */}
      <section className="container mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Ticket Booking Section */}
            <BookingForm 
              movieId={id || '1'} 
              movieTitle={movie.title} 
              isUpcoming={isUpcoming}
              showtimes={showtimes}
            />

            <MovieInfo 
              director={movie.director}
              studios={movie.studios}
            />
          </div>
          
          <div className="md:w-2/3">
            {/* Status Badge */}
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isUpcoming 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {movie.status}
              </span>
            </div>
            
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
