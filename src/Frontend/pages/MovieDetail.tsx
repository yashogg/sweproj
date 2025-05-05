
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getShowtimes } from '../services/showtime-service';
import { getMovieById } from '../services/movie-service';
import { ShowtimeWithDetails, MovieWithShowtimes, ReviewItem } from '../services/types';
import { initializeLocalData } from '../services/local-storage-service';

// Import our components
import MovieHero from '@/components/movie-detail/MovieHero';
import MovieSidebar from '../components/movie-detail/MovieSidebar';
import MovieDetails from '../components/movie-detail/MovieDetails';
import LoadingSpinner from './../../components/ui/LoadingSpinner';
import NotFound from '../components/ui/NotFound';

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
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout title="Movie Not Found">
        <NotFound 
          title="Movie Not Found" 
          message="Sorry, we couldn't find the movie you're looking for."
        />
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
          {/* Sidebar with Booking Form and Movie Info */}
          <MovieSidebar 
            movieId={id || '1'}
            movieTitle={title}
            isUpcoming={isUpcoming}
            showtimes={showtimes}
            director=""
            studios={[]}
          />
          
          {/* Main content with Synopsis, Cast, Ratings, and Reviews */}
          <MovieDetails 
            description={description || ''}
            cast={cast}
            rating={rating || 0}
            status={movie.status}
            reviews={initialReviews}
            movieId={id || '1'}
          />
        </div>
      </section>
    </Layout>
  );
};

export default MovieDetail;
