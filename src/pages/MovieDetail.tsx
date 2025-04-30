
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Clock, Calendar, Film, Star, Heart, Share2, Download } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RatingCircle from '../components/RatingCircle';

// Sample movie data
const movieData = {
  id: 1,
  title: "Spider-Man: No Way Home",
  tagline: "The Multiverse unleashed.",
  description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
  poster: "/lovable-uploads/06cfccd8-26cd-4e91-8045-d77d80b03755.png",
  backdrop: "https://via.placeholder.com/1920x1080/2D1B4E/FFFFFF?text=Spider-Man+Background",
  releaseDate: "December 17, 2021",
  duration: "2h 28m",
  genres: ["Action", "Adventure", "Science Fiction"],
  rating: 8.4,
  director: "Jon Watts",
  cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon", "Jon Favreau"],
  studios: ["Marvel Studios", "Columbia Pictures", "Pascal Pictures"]
};

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState(movieData);
  
  // Simulate loading movie data
  useEffect(() => {
    // In a real app, you would fetch movie by ID here
    console.log(`Loading movie with ID: ${id}`);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-movie-dark text-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative h-[70vh] bg-cover bg-center" style={{ 
          backgroundImage: `linear-gradient(to top, #1A0B2E, transparent), url(${movie.backdrop})` 
        }}>
          <div className="container mx-auto h-full flex items-end pb-16 px-5">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{movie.title}</h1>
              <p className="text-movie-accent text-lg mb-6">{movie.tagline}</p>
              
              <div className="flex items-center space-x-8 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{movie.releaseDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{movie.duration}</span>
                </div>
                <div className="flex items-center">
                  <Film className="w-4 h-4 mr-2" />
                  <span className="text-sm">{movie.genres.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-movie-accent text-black font-bold rounded hover:brightness-110 transition-all flex items-center">
                  <span>Watch Now</span>
                </button>
                <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Movie Details */}
        <section className="container mx-auto px-5 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-movie-light p-1 rounded-md overflow-hidden">
                <img 
                  src={movie.poster || "https://via.placeholder.com/500x750/2D1B4E/FFFFFF?text=No+Poster"} 
                  alt={movie.title} 
                  className="w-full h-auto rounded"
                />
              </div>
              
              <div className="mt-8 bg-movie-light p-6 rounded-md">
                <h3 className="font-bold text-xl mb-4">Movie Info</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="block text-gray-400 text-sm">Director</span>
                    <span>{movie.director}</span>
                  </div>
                  
                  <div>
                    <span className="block text-gray-400 text-sm">Cast</span>
                    <span>{movie.cast.slice(0, 3).join(', ')} {movie.cast.length > 3 && '...'}</span>
                  </div>
                  
                  <div>
                    <span className="block text-gray-400 text-sm">Studios</span>
                    <span>{movie.studios.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="bg-movie-light p-6 rounded-md mb-8">
                <h2 className="text-2xl font-bold mb-2">Synopsis</h2>
                <p className="text-gray-200">{movie.description}</p>
              </div>
              
              <div className="bg-movie-light p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-6">Ratings</h2>
                
                <div className="flex justify-around">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <RatingCircle rating={movie.rating} size="lg" />
                    </div>
                    <span className="text-sm text-gray-400">User Score</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <RatingCircle rating={7.9} size="lg" color="#3498db" />
                    </div>
                    <span className="text-sm text-gray-400">Critics Score</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <RatingCircle rating={8.2} size="lg" color="#9b59b6" />
                    </div>
                    <span className="text-sm text-gray-400">MovieApp Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetail;
