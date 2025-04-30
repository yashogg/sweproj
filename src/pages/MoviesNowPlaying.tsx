
import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MovieCard from '@/components/MovieCard';

// Sample movie data - now playing movies
const nowPlayingMovies = [
  { id: 1, title: "Spider-Man: No Way Home", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man", rating: 8.4 },
  { id: 2, title: "The Batman", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Batman", rating: 8.0 },
  { id: 3, title: "Doctor Strange", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Dr+Strange", rating: 7.9 },
  { id: 4, title: "Black Panther: Wakanda Forever", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Black+Panther", rating: 7.8 },
  { id: 5, title: "Thor: Love and Thunder", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Thor", rating: 7.5 },
  { id: 6, title: "Top Gun: Maverick", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Top+Gun", rating: 8.7 },
  { id: 7, title: "Avatar: The Way of Water", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Avatar", rating: 8.1 },
  { id: 8, title: "Black Adam", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Black+Adam", rating: 7.2 },
  { id: 9, title: "Ant-Man: Quantumania", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Ant-Man", rating: 7.0 },
  { id: 10, title: "Shazam! Fury of the Gods", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Shazam", rating: 6.9 },
  { id: 11, title: "The Flash", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Flash", rating: 7.3 },
  { id: 12, title: "Guardians of the Galaxy Vol. 3", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Guardians", rating: 8.5 }
];

const MoviesNowPlaying = () => {
  const [movies, setMovies] = useState(nowPlayingMovies);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi'];
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // In a real app, you would filter the movies based on the selected genre
    setMovies(nowPlayingMovies);
  };

  return (
    <Layout title="Now Playing Movies">
      <div className="bg-gradient-to-b from-ticketeer-purple-darker to-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Now Playing</h1>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded text-white hover:bg-opacity-30 transition-all">
                <Filter className="w-4 h-4 mr-2" />
                <span>Filters</span>
              </button>
              
              <button className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded text-white hover:bg-opacity-30 transition-all">
                <span>Sort By: Popular</span>
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
              3
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

export default MoviesNowPlaying;
