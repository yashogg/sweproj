
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ShowtimeWithDetails } from "../../services/types";

interface BookingFormActionsProps {
  isAuthenticated: boolean;
  selectedTheater: string;
  selectedShowtime: string;
  selectedDate: string;
  selectedShowtimeId: string;
  seatCount: number;
  movieId: string;
  movieTitle: string;
  databaseShowtimes: ShowtimeWithDetails[];
}

const BookingFormActions = ({
  isAuthenticated,
  selectedTheater,
  selectedShowtime,
  selectedDate,
  selectedShowtimeId,
  seatCount,
  movieId,
  movieTitle,
  databaseShowtimes
}: BookingFormActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    if (!selectedTheater || !selectedShowtime || !selectedDate || !selectedShowtimeId) {
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

    // Find the selected showtime to get price
    const showtime = databaseShowtimes.find(st => st.id === selectedShowtimeId);
    const ticketPrice = showtime?.price || 12.99;

    // Store booking details in session storage
    const bookingDetails = {
      movieId,
      movieTitle,
      theater: selectedTheater,
      showtime: selectedShowtime,
      showtimeId: selectedShowtimeId,
      date: selectedDate,
      seats: seatCount,
      ticketPrice,
      totalAmount: (ticketPrice * seatCount).toFixed(2)
    };
    
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    navigate('/checkout');
  };

  return (
    <div className="pt-4">
      <Button 
        onClick={handleBuyTickets}
        className="w-full bg-ticketeer-yellow text-black hover:bg-yellow-400"
        aria-label="Buy tickets for this movie"
      >
        Buy Tickets
      </Button>
    </div>
  );
};

export default BookingFormActions;
