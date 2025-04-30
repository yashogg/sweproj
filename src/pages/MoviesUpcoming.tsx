
import { useState } from 'react';
import { Filter, ChevronDown, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MovieCard from '@/components/MovieCard';

// Sample movie data - upcoming movies
const upcomingMovies = [
  { id: 13, title: "Dune: Part Two", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Dune+2", rating: 8.5 },
  { id: 14, title: "The Marvels", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=The+Marvels", rating: 7.8 },
  { id: 15, title: "Mission: Impossible 8", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Mission+Impossible", rating: 8.2 },
  { id: 16, title: "Deadpool 3", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Deadpool+3", rating: 8.7 },
  { id: 17, title: "Fantastic Four", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Fantastic+Four", rating: 7.9 },
  { id: 18, title: "Avatar 3", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Avatar+3", rating: 8.4 },
  { id: 19, title: "Indiana Jones 5", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Indiana+Jones", rating: 7.5 },
  { id: 20, title: "The Batman 2", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Batman+2", rating: 8.3 },
  { id: 21, title: "Blade", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Blade", rating: 7.8 },
  { id: 22, title: "Guardians of the Galaxy Vol. 4", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Guardians+4", rating: 8.1 },
  { id: 23, title: "Black Panther 3", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Black+Panther+3", rating: 7.9 },
  { id: 24, title: "Fast & Furious 11", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Fast+11", rating: 7.0 }
];

const MoviesUpcoming = () => {
  const [movies, setMovies] = useState(upcomingMovies);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'];
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // In a real app, you would filter the movies based on the selected genre
    setMovies(upcomingMovies);
  };

  return (
    <Layout title="Upcoming Movies">
      <div className="bg-gradient-to-b from-ticketeer-purple-darker to-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Calendar className="mr-2" /> Coming Soon
            </h1>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded text-white hover:bg-opacity-30 transition-all">
                <Filter className="w-4 h-4 mr-2" />
                <span>Filters</span>
              </button>
              
              <button className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded text-white hover:bg-opacity-30 transition-all">
                <span>Sort By: Release Date</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map(filter => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeFilter === filter 
                    ? 'bg-ticketeer-purple text-white' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imagePath={movie.imagePath}
              rating={movie.rating}
            />
          ))}
        </div>
        
        {/* Pagination */}
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
      </div>
    </Layout>
  );
};

export default MoviesUpcoming;
