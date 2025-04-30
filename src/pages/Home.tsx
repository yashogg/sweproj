import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Ticket, ChevronRight, Calendar, Film } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { useToast } from '@/hooks/use-toast';

// Sample data for featured movie
const FEATURED_MOVIE = {
  id: "1",
  title: "Inception",
  description: "A thief who enters the dreams of others to steal secrets from their subconscious. His rare ability has made him a highly sought-after corporate spy but has also cost him everything he once held dear.",
  image: "https://image.tmdb.org/t/p/original/8bxMHkuEzRpIC1YeVhKCNgUlD9T.jpg",
  director: "Christopher Nolan",
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  duration: "2h 28m",
  rating: 8.8
};

// Sample data for now playing movies
const NOW_PLAYING = [
  { id: "1", title: "Inception", image: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: 8.8 },
  { id: "2", title: "The Shawshank Redemption", image: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: 9.3 },
  { id: "3", title: "The Dark Knight", image: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 9.0 },
  { id: "4", title: "Pulp Fiction", image: "https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", rating: 8.9 }
];

// Sample data for upcoming movies
const UPCOMING = [
  { id: "5", title: "Dune: Part Two", image: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", rating: 8.5 },
  { id: "6", title: "The Batman", image: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", rating: 8.4 },
  { id: "7", title: "Black Panther 2", image: "https://image.tmdb.org/t/p/w300/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", rating: 7.9 },
  { id: "8", title: "Avatar 3", image: "https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 8.2 }
];

// Theater locations for selection
const THEATERS = [
  "Lubbock",
  "Amarillo",
  "Levelland",
  "Plainview",
  "Snyder",
  "Abilene"
];

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTheater, setSelectedTheater] = useState(THEATERS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Get dates for the next 7 days
  const getNextDays = (days: number) => {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  };
  
  const nextDays = getNextDays(7);
  
  return (
    <Layout title="Book Movie Tickets Online">
      {/* Hero Section with Featured Movie */}
      <section className="relative">
        <div 
          className="h-[70vh] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${FEATURED_MOVIE.image})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ticketeer-purple-darker to-transparent opacity-70"></div>
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {FEATURED_MOVIE.title}
              </h1>
              <p className="text-lg mb-8">
                {FEATURED_MOVIE.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <span className="bg-ticketeer-purple px-3 py-1 rounded-full">
                  IMDb {FEATURED_MOVIE.rating}/10
                </span>
                <span>{FEATURED_MOVIE.duration}</span>
                <span>Director: {FEATURED_MOVIE.director}</span>
              </div>
              <Button 
                onClick={() => navigate(`/movies/${FEATURED_MOVIE.id}`)} 
                className="btn-primary text-lg"
              >
                <Ticket className="mr-2" /> Book Tickets
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Booking Section */}
      <section className="py-8 bg-ticketeer-purple-soft">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-ticketeer-purple-dark mb-4">Quick Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Theater Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Theater
                </label>
                <select 
                  value={selectedTheater} 
                  onChange={(e) => setSelectedTheater(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ticketeer-purple focus:border-transparent"
                >
                  {THEATERS.map((theater) => (
                    <option key={theater} value={theater}>{theater}</option>
                  ))}
                </select>
              </div>
              
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {nextDays.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`min-w-[80px] p-2 text-center text-sm rounded-md ${
                        date.toDateString() === selectedDate.toDateString()
                          ? 'bg-ticketeer-purple text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex items-end">
                <Button 
                  onClick={() => navigate('/movies/now-playing')}
                  className="w-full bg-ticketeer-purple hover:bg-ticketeer-purple-dark text-white"
                >
                  Find Movies <ChevronRight className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
                id={Number(movie.id)}
                title={movie.title}
                imagePath={movie.image}
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
                id={Number(movie.id)}
                title={movie.title}
                imagePath={movie.image}
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
                <Ticket className="h-8 w-8" />
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
