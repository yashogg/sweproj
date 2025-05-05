
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MovieHero from '../components/movie/MovieHero';
import MovieDetails from '../components/movie/MovieDetails';
import BookingForm from '../components/movie/BookingForm';
import { getMovieById, getShowtimes } from '../services/api.service';
import { Movie, ShowtimeWithDetails, ReviewItem } from '../services/types';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
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
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout title="Movie Not Found">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-gray-600">Sorry, we couldn't find the movie you're looking for.</p>
        </div>
      </Layout>
    );
  }

  const isUpcoming = movie.status === 'Upcoming';
  
  // Default reviews if none exist
  const initialReviews: ReviewItem[] = [
    { id: '1', user: 'MovieFan123', rating: 9, comment: 'Absolutely loved it!', date: new Date().toISOString() },
    { id: '2', user: 'CriticEye', rating: 7, comment: 'Good, but somewhat predictable.', date: new Date().toISOString() }
  ];

  // Parse cast members for display
  const cast = movie.castMembers ? movie.castMembers.split(',').map(member => {
    const [name, character] = member.split(' as ');
    return {
      name: name.trim(),
      character: character || 'Unknown',
      photo: 'https://via.placeholder.com/138x175' // Placeholder image
    };
  }) : [];

  return (
    <Layout title={movie.title}>
      {/* Hero Banner */}
      <MovieHero 
        title={movie.title}
        releaseDate={movie.releaseDate || ''}
        duration={movie.duration ? `${movie.duration} min` : ''}
        genres={movie.genre ? movie.genre.split('/') : []}
        backdrop={movie.imagePath || ''} 
      />
      
      {/* Movie Details */}
      <section className="container mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Booking Form */}
          <div className="w-full md:w-1/3">
            <BookingForm 
              movieId={id || ''}
              movieTitle={movie.title}
              isUpcoming={isUpcoming}
              showtimes={showtimes}
            />
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <MovieDetails 
              description={movie.description || ''}
              cast={cast}
              rating={movie.rating || 0}
              status={movie.status}
              reviews={initialReviews}
              movieId={id || ''}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MovieDetail;
