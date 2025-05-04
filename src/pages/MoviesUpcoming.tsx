
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MovieCardWithStatus from '@/components/MovieCardWithStatus';
import { getUpcomingMovies } from '@/services/movie-service';
import { useToast } from '@/hooks/use-toast';
import { Movie } from '@/services/supabase-types';

const MoviesUpcoming = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const upcomingMovies = await getUpcomingMovies();
        setMovies(upcomingMovies);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        toast({
          title: "Error",
          description: "Failed to load upcoming movies. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [toast]);

  return (
    <Layout title="Upcoming Movies">
      <div className="bg-gradient-to-b from-ticketeer-purple-darker to-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Coming Soon</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ticketeer-purple"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium text-gray-600">No upcoming movies</h2>
            <p className="text-gray-500 mt-2">Check back soon for new releases!</p>
          </div>
        ) : (
          /* Movies Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {movies.map(movie => (
              <MovieCardWithStatus
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imagePath={movie.image_path || '/placeholder.svg'}
                rating={movie.rating || 0}
                status="Upcoming"
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!loading && movies.length > 0 && (
          <div className="mt-10 flex justify-center">
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
                &lt;
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-ticketeer-purple text-white font-bold">
                1
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
                2
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MoviesUpcoming;
