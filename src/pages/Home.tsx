
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ChevronRight, Film, Calendar } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { useToast } from '@/hooks/use-toast';

// Sample data for now playing movies
const NOW_PLAYING = [
  { id: 1, title: "Inception", imagePath: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: 8.8 },
  { id: 2, title: "The Shawshank Redemption", imagePath: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: 9.3 },
  { id: 3, title: "The Dark Knight", imagePath: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 9.0 },
  { id: 4, title: "Pulp Fiction", imagePath: "https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", rating: 8.9 }
];

// Sample data for upcoming movies
const UPCOMING = [
  { id: 5, title: "Dune: Part Two", imagePath: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", rating: 8.5 },
  { id: 6, title: "The Batman", imagePath: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", rating: 8.4 },
  { id: 7, title: "Black Panther 2", imagePath: "https://image.tmdb.org/t/p/w300/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", rating: 7.9 },
  { id: 8, title: "Avatar 3", imagePath: "https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 8.2 }
];

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  return (
    <Layout title="Book Movie Tickets Online">
      <div className="bg-ticketeer-purple-darker py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Welcome to Ticketeer
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Your premier destination for booking movie tickets online. 
            Browse now playing and upcoming movies.
          </p>
        </div>
      </div>
      
      {/* Now Playing Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-ticketeer-purple-dark flex items-center">
              <Film className="mr-2" /> Now Playing
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/movies/now-playing')}
              className="text-ticketeer-purple hover:text-ticketeer-purple-dark"
            >
              View All <ChevronRight className="ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {NOW_PLAYING.map((movie) => (
              <MovieCard 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imagePath={movie.imagePath}
                rating={movie.rating}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming Movies Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-ticketeer-purple-dark flex items-center">
              <Calendar className="mr-2" /> Coming Soon
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/movies/upcoming')}
              className="text-ticketeer-purple hover:text-ticketeer-purple-dark"
            >
              View All <ChevronRight className="ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {UPCOMING.map((movie) => (
              <MovieCard 
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imagePath={movie.imagePath}
                rating={movie.rating}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* User Benefits Section */}
      <section className="py-16 bg-ticketeer-purple-darker text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Book with Ticketeer?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-ticketeer-purple-dark bg-opacity-30 rounded-lg">
              <div className="bg-ticketeer-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Film className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skip the Lines</h3>
              <p>Say goodbye to long queues. Book your tickets online and walk right in.</p>
            </div>
            
            <div className="p-6 bg-ticketeer-purple-dark bg-opacity-30 rounded-lg">
              <div className="bg-ticketeer-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Film className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Latest Movies</h3>
              <p>Get access to the newest releases and exclusive screenings at our theaters.</p>
            </div>
            
            <div className="p-6 bg-ticketeer-purple-dark bg-opacity-30 rounded-lg">
              <div className="bg-ticketeer-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Planning</h3>
              <p>View showtimes, read reviews, and plan your movie night effortlessly.</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/register')} 
            className="mt-12 btn-primary text-lg"
          >
            Sign Up Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
