
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CategoryRow from '../components/CategoryRow';

// Sample data
const popularMovies = [
  { id: 1, title: "Spider-Man: No Way Home", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man", rating: 8.4 },
  { id: 2, title: "The Batman", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Batman", rating: 8.0 },
  { id: 3, title: "Doctor Strange", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Dr+Strange", rating: 7.9 },
  { id: 4, title: "Black Panther: Wakanda Forever", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Black+Panther", rating: 7.8 },
  { id: 5, title: "Thor: Love and Thunder", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Thor", rating: 7.5 },
  { id: 6, title: "Top Gun: Maverick", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Top+Gun", rating: 8.7 }
];

const newReleases = [
  { id: 7, title: "Avatar: The Way of Water", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Avatar", rating: 8.1 },
  { id: 8, title: "Black Adam", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Black+Adam", rating: 7.2 },
  { id: 9, title: "Ant-Man: Quantumania", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Ant-Man", rating: 7.0 },
  { id: 10, title: "Shazam! Fury of the Gods", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Shazam", rating: 6.9 },
  { id: 11, title: "The Flash", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Flash", rating: 7.3 },
  { id: 12, title: "Guardians of the Galaxy Vol. 3", imagePath: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Guardians", rating: 8.5 }
];

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState({
    id: 1,
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    backdrop: "https://via.placeholder.com/1920x1080/2D1B4E/FFFFFF?text=Spider-Man+Background",
    poster: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man",
    rating: 8.4
  });

  return (
    <div className="min-h-screen flex flex-col bg-movie-dark text-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-cover bg-center" style={{ 
          backgroundImage: `linear-gradient(to top, #1A0B2E, transparent), url(${featuredMovie.backdrop})` 
        }}>
          <div className="container mx-auto h-full flex items-end pb-16 px-5">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{featuredMovie.title}</h1>
              <p className="text-sm md:text-base mb-6 text-gray-200">{featuredMovie.description}</p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-movie-accent text-black font-bold rounded hover:brightness-110 transition-all flex items-center">
                  <span>Watch Now</span>
                </button>
                <button className="px-6 py-3 bg-opacity-20 bg-white border border-white rounded font-bold hover:bg-opacity-30 transition-all">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-5 py-10">
          <CategoryRow 
            title="Popular Movies" 
            movies={popularMovies}
            viewAllLink="/movies/popular"
          />
          
          <CategoryRow 
            title="New Releases" 
            movies={newReleases}
            viewAllLink="/movies/new"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
