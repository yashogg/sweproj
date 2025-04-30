import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Clock, Calendar, Film, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import RatingCircle from '@/components/RatingCircle';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

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
  ],
  // Added showtimes data for implementation
  showtimes: [
    { id: 1, time: "10:30 AM", date: "2025-05-01" },
    { id: 2, time: "1:45 PM", date: "2025-05-01" },
    { id: 3, time: "5:15 PM", date: "2025-05-01" },
    { id: 4, time: "8:30 PM", date: "2025-05-01" },
    { id: 5, time: "10:30 AM", date: "2025-05-02" },
    { id: 6, time: "1:45 PM", date: "2025-05-02" },
    { id: 7, time: "5:15 PM", date: "2025-05-02" },
    { id: 8, time: "8:30 PM", date: "2025-05-02" }
  ]
};

// Available theaters
const theaters = [
  { id: 1, name: "Lubbock" },
  { id: 2, name: "Amarillo" },
  { id: 3, name: "Levelland" },
  { id: 4, name: "Plainview" },
  { id: 5, name: "Snyder" },
  { id: 6, name: "Abilene" }
];

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [movie, setMovie] = useState(movieData);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ""
  });
  
  // Get unique dates for the select dropdown
  useEffect(() => {
    if (movie && movie.showtimes) {
      const dates = [...new Set(movie.showtimes.map(show => show.date))];
      setAvailableDates(dates);
      if (dates.length > 0) setSelectedDate(dates[0]);
    }
  }, [movie]);

  // Simulate loading movie data
  useEffect(() => {
    // In a real app, you would fetch movie by ID here
    console.log(`Loading movie with ID: ${id}`);
  }, [id]);

  // Handle buying tickets
  const handleBuyTickets = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase tickets",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!selectedTheater || !selectedShowtime || !selectedDate) {
      toast({
        title: "Selection Required",
        description: "Please select theater, date and showtime",
        variant: "destructive"
      });
      return;
    }
    
    // Store booking details in session storage
    const bookingDetails = {
      movieId: id,
      movieTitle: movie.title,
      theater: selectedTheater,
      showtime: selectedShowtime,
      date: selectedDate,
      seats: seatCount,
      ticketPrice: 12.99, // Sample price
      totalAmount: (12.99 * seatCount).toFixed(2)
    };
    
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    navigate('/checkout');
  };

  // Handle submitting a review
  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review",
        variant: "destructive"
      });
      return;
    }

    if (reviewForm.comment.trim() === '') {
      toast({
        title: "Review Required",
        description: "Please enter a review comment",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be an API call to save the review
    const newReview = {
      id: Math.floor(Math.random() * 1000),
      user: "CurrentUser", // In a real app, get this from auth context
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setMovie(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview]
    }));

    setReviewForm({ rating: 5, comment: "" });
    setShowReviewForm(false);

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!"
    });
  };

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
          </div>
        </div>
      </section>
      
      {/* Movie Details */}
      <section className="container mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-ticketeer-purple-dark p-1 rounded-md overflow-hidden">
              <img 
                src={movie.poster} 
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

            {/* Ticket Booking Section */}
            <div className="mt-8 bg-ticketeer-purple-dark p-6 rounded-md">
              <h3 className="font-bold text-xl mb-4 text-white">Book Tickets</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Select Theater</label>
                  <Select
                    value={selectedTheater}
                    onValueChange={setSelectedTheater}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Theater" />
                    </SelectTrigger>
                    <SelectContent>
                      {theaters.map(theater => (
                        <SelectItem key={theater.id} value={theater.name}>
                          {theater.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Select Date</label>
                  <Select
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Date" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDates.map(date => {
                        const formattedDate = new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        });
                        return (
                          <SelectItem key={date} value={date}>
                            {formattedDate}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Select Showtime</label>
                  <Select
                    value={selectedShowtime}
                    onValueChange={setSelectedShowtime}
                    disabled={!selectedDate}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Showtime" />
                    </SelectTrigger>
                    <SelectContent>
                      {movie.showtimes
                        .filter(show => show.date === selectedDate)
                        .map(show => (
                          <SelectItem key={show.id} value={show.time}>
                            {show.time}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Number of Tickets</label>
                  <Select
                    value={seatCount.toString()}
                    onValueChange={(value) => setSeatCount(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Number of Tickets" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i+1} value={(i+1).toString()}>
                          {i+1} {i === 0 ? 'ticket' : 'tickets'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleBuyTickets} 
                    className="w-full bg-ticketeer-yellow text-black hover:bg-yellow-400"
                  >
                    Buy Tickets
                  </Button>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Reviews</h2>
                {!showReviewForm && (
                  <Button 
                    onClick={() => setShowReviewForm(true)}
                    variant="outline"
                    className="text-white border-ticketeer-yellow hover:bg-ticketeer-yellow hover:text-black"
                  >
                    Write a Review
                  </Button>
                )}
              </div>
              
              {showReviewForm && (
                <div className="border-b border-ticketeer-purple pb-6 mb-6">
                  <h3 className="font-bold text-white mb-4">Your Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Rating (1-10)</label>
                      <Select
                        value={reviewForm.rating.toString()}
                        onValueChange={(value) => setReviewForm({...reviewForm, rating: parseInt(value)})}
                      >
                        <SelectTrigger className="w-full max-w-[200px]">
                          <SelectValue placeholder="Select Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i+1} value={(i+1).toString()}>
                              {i+1} {i === 0 ? 'star' : 'stars'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Your Comments</label>
                      <textarea 
                        className="w-full bg-ticketeer-purple p-3 rounded text-white"
                        rows={4}
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                        placeholder="Share your thoughts about this movie..."
                      ></textarea>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSubmitReview}
                        className="bg-ticketeer-yellow text-black hover:bg-yellow-400"
                      >
                        Submit Review
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
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
