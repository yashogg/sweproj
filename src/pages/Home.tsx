
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Film, Calendar } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import MovieSection from '@/components/home/MovieSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import { useToast } from '@/hooks/use-toast';
import { getNowPlayingMovies, getUpcomingMovies } from '@/services/movie-service';
import { Movie } from '@/services/types';

// Define the internal Movie type that matches what MovieSection expects
interface MovieCardData {
  id: string;
  title: string;
  imagePath: string;
  rating?: number;
}

const Home = () => {
  const { toast } = useToast();
  const [nowPlaying, setNowPlaying] = useState<MovieCardData[]>([]);
  const [upcoming, setUpcoming] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlayingMovies, upcomingMovies] = await Promise.all([
          getNowPlayingMovies(),
          getUpcomingMovies()
        ]);
        
        setNowPlaying(transformMovies(nowPlayingMovies));
        setUpcoming(transformMovies(upcomingMovies));
      } catch (error) {
        console.error('Error fetching movies:', error);
        toast({
          title: "Error",
          description: "Failed to load movie data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [toast]);
  
  // Transform API data to match MovieSection component props
  const transformMovies = (movies: Movie[]): MovieCardData[] => {
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      imagePath: movie.imagePath || '/placeholder.svg',
      rating: movie.rating
    }));
  };
  
  return (
    <Layout title="Book Movie Tickets Online">
      <HeroSection />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ticketeer-purple"></div>
        </div>
      ) : (
        <>
          {/* Now Playing Section */}
          <MovieSection
            title="Now Playing"
            icon={<Film className="mr-2" />}
            movies={nowPlaying}
            viewAllPath="/movies/now-playing"
          />
          
          {/* Upcoming Movies Section */}
          <MovieSection
            title="Coming Soon"
            icon={<Calendar className="mr-2" />}
            movies={upcoming}
            viewAllPath="/movies/upcoming"
            bgClass="bg-gray-50"
          />
        </>
      )}
      
      {/* User Benefits Section */}
      <BenefitsSection />
    </Layout>
  );
};

export default Home;
