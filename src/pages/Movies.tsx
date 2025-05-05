
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MovieCard from '../components/MovieCard';
import { getMovies, getNowPlayingMovies, getUpcomingMovies } from '../services/api.service';
import { Movie } from '../services/types';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'nowPlaying', 'upcoming'
  
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('now-playing')) {
      setActiveTab('nowPlaying');
    } else if (path.includes('upcoming')) {
      setActiveTab('upcoming');
    } else {
      setActiveTab('all');
    }
  }, [location.pathname]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let movieData: Movie[];
        
        switch (activeTab) {
          case 'nowPlaying':
            movieData = await getNowPlayingMovies();
            break;
          case 'upcoming':
            movieData = await getUpcomingMovies();
            break;
          default:
            movieData = await getMovies();
        }
        
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [activeTab]);
  
  const getTitle = () => {
    switch (activeTab) {
      case 'nowPlaying':
        return 'Now Playing';
      case 'upcoming':
        return 'Coming Soon';
      default:
        return 'All Movies';
    }
  };
  
  return (
    <Layout title={getTitle()}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getTitle()}</h1>
          
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              All Movies
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'nowPlaying' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('nowPlaying')}
            >
              Now Playing
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Coming Soon
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imagePath={movie.imagePath || 'https://via.placeholder.com/300x450'}
                  rating={movie.rating || 0}
                  status={movie.status}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">No movies found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Movies;
