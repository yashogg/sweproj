
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getShowtimes } from '../services/showtime-service';
import { getMovieById } from '../services/movie-service';
import { ShowtimeWithDetails, MovieWithShowtimes, ReviewItem } from '../services/types';
import { initializeLocalData } from '../services/local-storage-service';

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

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieWithShowtimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [showtimes, setShowtimes] = useState<ShowtimeWithDetails[]>([]);
  
  // Fetch movie and showtimes data
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch movie by ID
        const movieData = await getMovieById(id);
        if (movieData) {
          setMovie(movieData);
          
          // Fetch showtimes for this movie
          const showtimesData = await getShowtimes(id);
          setShowtimes(showtimesData);
        }
      } catch (error) {
        console.error('Error loading movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
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
  
  // Extract movie details
  const {
    title,
    description,
    image_path,
    release_date,
    duration,
    genre,
    rating,
    cast_members
  } = movie;
  
  // Parse cast members for CastSection
  const cast = cast_members ? cast_members.split(',').map(member => {
    const [name, character] = member.split(' as ');
    return {
      name: name.trim(),
      character: character || 'Unknown',
      photo: 'https://via.placeholder.com/138x175' // Placeholder image
    };
  }) : [];
  
  // Default reviews if none exist
  const initialReviews: ReviewItem[] = [
    { id: '1', user: 'MovieFan123', rating: 9, comment: 'Absolutely loved it!', date: new Date().toISOString() },
    { id: '2', user: 'CriticEye', rating: 7, comment: 'Good, but somewhat predictable.', date: new Date().toISOString() }
  ];

  return (
    <Layout title={title}>
      {/* Hero Banner */}
      <MovieHero 
        title={title}
        tagline=""
        releaseDate={release_date || ''}
        duration={duration ? `${duration} min` : ''}
        genres={genre ? genre.split('/') : []}
        backdrop={image_path || ''} 
      />
      
      {/* Movie Details */}
      <section className="container mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Ticket Booking Section */}
            <BookingForm 
              movieId={id || '1'} 
              movieTitle={title} 
              isUpcoming={isUpcoming}
              showtimes={showtimes} // Passing ShowtimeWithDetails[] directly now
            />

            <MovieInfo 
              director=""
              studios={[]}
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
            <Synopsis description={description || ''} />
            
            {/* Cast Section */}
            <CastSection cast={cast} />
            
            {/* Ratings */}
            <RatingsSection userRating={rating || 0} />
            
            {/* Reviews Section */}
            <ReviewsSection initialReviews={initialReviews} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MovieDetail;
