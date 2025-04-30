
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Clock, Calendar, Film, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import RatingCircle from '@/components/RatingCircle';

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
  cast: [
    { name: "Tom Holland", character: "Peter Parker / Spider-Man", photo: "https://via.placeholder.com/100x100/2D1B4E/FFFFFF?text=TH" },
    { name: "Zendaya", character: "MJ", photo: "https://via.placeholder.com/100x100/2D1B4E/FFFFFF?text=Z" },
    { name: "Benedict Cumberbatch", character: "Dr. Stephen Strange", photo: "https://via.placeholder.com/100x100/2D1B4E/FFFFFF?text=BC" },
    { name: "Jacob Batalon", character: "Ned Leeds", photo: "https://via.placeholder.com/100x100/2D1B4E/FFFFFF?text=JB" },
    { name: "Jon Favreau", character: "Happy Hogan", photo: "https://via.placeholder.com/100x100/2D1B4E/FFFFFF?text=JF" }
  ],
  studios: ["Marvel Studios", "Columbia Pictures", "Pascal Pictures"],
  reviews: [
    { id: 1, user: "MovieFan123", rating: 9, comment: "Absolutely loved it! The multiverse concept was executed perfectly.", date: "2021-12-20" },
    { id: 2, user: "ComicBookGuy", rating: 10, comment: "Best Spider-Man movie ever. The callbacks to previous films were amazing.", date: "2021-12-19" },
    { id: 3, user: "CriticEye", rating: 7, comment: "Good, but somewhat predictable. The fan service worked well though.", date: "2021-12-22" }
  ]
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
    <Layout title={movie.title}>
      {/* Hero Banner */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ 
        backgroundImage: `linear-gradient(to top, #1A0B2E, transparent), url(${movie.backdrop})` 
      }}>
        <div className="container mx-auto h-full flex items-end pb-16 px-5">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">{movie.title}</h1>
            <p className="text-ticketeer-yellow text-lg mb-6">{movie.tagline}</p>
            
            <div className="flex flex-wrap items-center space-x-8 mb-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-white" />
                <span className="text-sm text-white">{movie.releaseDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-white" />
                <span className="text-sm text-white">{movie.duration}</span>
              </div>
              <div className="flex items-center">
                <Film className="w-4 h-4 mr-2 text-white" />
                <span className="text-sm text-white">{movie.genres.join(', ')}</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-ticketeer-yellow text-black font-bold rounded hover:brightness-110 transition-all flex items-center">
                <span>Buy Tickets</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Movie Details */}
      <section className="container mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-ticketeer-purple-dark p-1 rounded-md overflow-hidden">
              <img 
                src={movie.poster || "https://via.placeholder.com/500x750/2D1B4E/FFFFFF?text=No+Poster"} 
                alt={movie.title} 
                className="w-full h-auto rounded"
              />
            </div>
            
            <div className="mt-8 bg-ticketeer-purple-dark p-6 rounded-md">
              <h3 className="font-bold text-xl mb-4 text-white">Movie Info</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-gray-400 text-sm">Director</span>
                  <span className="text-white">{movie.director}</span>
                </div>
                
                <div>
                  <span className="block text-gray-400 text-sm">Studios</span>
                  <span className="text-white">{movie.studios.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            {/* Synopsis */}
            <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Synopsis</h2>
              <p className="text-gray-200">{movie.description}</p>
            </div>
            
            {/* Cast Section */}
            <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 rounded-full bg-ticketeer-purple mx-auto mb-2 overflow-hidden">
                      <img src={actor.photo} alt={actor.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-white text-sm">{actor.name}</h4>
                    <p className="text-gray-400 text-xs">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ratings */}
            <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Ratings</h2>
              
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
                  <span className="text-sm text-gray-400">Ticketeer Score</span>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-ticketeer-purple-dark p-6 rounded-md">
              <h2 className="text-2xl font-bold mb-6 text-white">Reviews</h2>
              
              <div className="space-y-6">
                {movie.reviews.map(review => (
                  <div key={review.id} className="border-b border-ticketeer-purple pb-4 mb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-white">{review.user}</h4>
                      <div className="flex items-center bg-ticketeer-purple px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-ticketeer-yellow mr-1" />
                        <span className="text-sm text-white">{review.rating}/10</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{review.comment}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{review.date}</span>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-white flex items-center text-xs">
                          <ThumbsUp className="w-3 h-3 mr-1" /> Helpful
                        </button>
                        <button className="text-gray-400 hover:text-white flex items-center text-xs">
                          <ThumbsDown className="w-3 h-3 mr-1" /> Not Helpful
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MovieDetail;
