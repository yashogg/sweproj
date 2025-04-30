
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface BookingFormProps {
  movieId: string;
  movieTitle: string;
  showtimes: {
    id: number;
    time: string;
    date: string;
  }[];
  isUpcoming?: boolean; // New prop to indicate if movie is upcoming
}

// Available theaters - added as per requirements
const theaters = [
  { id: 1, name: "Lubbock" },
  { id: 2, name: "Amarillo" },
  { id: 3, name: "Levelland" },
  { id: 4, name: "Plainview" },
  { id: 5, name: "Snyder" },
  { id: 6, name: "Abilene" }
];

const BookingForm = ({ movieId, movieTitle, showtimes, isUpcoming = false }: BookingFormProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  
  // Get unique dates for the select dropdown
  useEffect(() => {
    if (showtimes) {
      const dates = [...new Set(showtimes.map(show => show.date))];
      setAvailableDates(dates);
      if (dates.length > 0) setSelectedDate(dates[0]);
    }
  }, [showtimes]);

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
    
    if (seatCount > 10) {
      toast({
        title: "Maximum Limit Exceeded",
        description: "You can book a maximum of 10 tickets per purchase",
        variant: "destructive"
      });
      return;
    }

    // Store booking details in session storage
    const bookingDetails = {
      movieId,
      movieTitle,
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

  // Display different content for upcoming movies
  if (isUpcoming) {
    return (
      <div className="bg-ticketeer-purple-dark p-6 rounded-md">
        <h3 className="font-bold text-xl mb-4 text-white">Coming Soon</h3>
        <Alert className="bg-blue-500/20 border-blue-500 text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This movie is not yet available for booking. Check back closer to the release date.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md">
      <h3 className="font-bold text-xl mb-4 text-white">Book Tickets</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Select Theater</label>
          <Select
            value={selectedTheater}
            onValueChange={setSelectedTheater}
          >
            <SelectTrigger className="w-full bg-ticketeer-purple-darker border-ticketeer-purple-dark text-white">
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
            <SelectTrigger className="w-full bg-ticketeer-purple-darker border-ticketeer-purple-dark text-white">
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
            <SelectTrigger className="w-full bg-ticketeer-purple-darker border-ticketeer-purple-dark text-white">
              <SelectValue placeholder="Select Showtime" />
            </SelectTrigger>
            <SelectContent>
              {showtimes
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
          <label className="block text-gray-400 text-sm mb-1">Number of Tickets (Max 10)</label>
          <Select
            value={seatCount.toString()}
            onValueChange={(value) => setSeatCount(parseInt(value))}
          >
            <SelectTrigger className="w-full bg-ticketeer-purple-darker border-ticketeer-purple-dark text-white">
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
            aria-label="Buy tickets for this movie"
          >
            Buy Tickets
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
