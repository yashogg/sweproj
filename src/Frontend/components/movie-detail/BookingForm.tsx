
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getShowtimes } from '@/services/showtime-service';
import { ShowtimeWithDetails } from '@/services/types';

// Import Components
import TheaterSelector from './TheaterSelector';
import DateSelector from './DateSelector';
import ShowtimeSelector from './ShowtimeSelector';
import SeatSelector from './SeatSelector';
import BookingFormActions from './BookingFormActions';
import UpcomingMovie from './UpcomingMovie';

interface BookingFormProps {
  movieId: string;
  movieTitle: string;
  showtimes?: ShowtimeWithDetails[];
  isUpcoming?: boolean;
}

const BookingForm = ({ movieId, movieTitle, isUpcoming = false }: BookingFormProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [databaseShowtimes, setDatabaseShowtimes] = useState<ShowtimeWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch showtimes from database
  useEffect(() => {
    const loadShowtimes = async () => {
      try {
        setIsLoading(true);
        const showtimeData = await getShowtimes(movieId);
        setDatabaseShowtimes(showtimeData);
        
        // Extract unique dates for the dropdown
        const dates = [...new Set(showtimeData.map(show => show.date))];
        setAvailableDates(dates);
        if (dates.length > 0) setSelectedDate(dates[0]);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        toast({
          title: "Error",
          description: "Failed to load showtimes",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    if (!isUpcoming && movieId) {
      loadShowtimes();
    }
  }, [movieId, isUpcoming, toast]);

  // Display different content for upcoming movies
  if (isUpcoming) {
    return <UpcomingMovie />;
  }

  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md">
      <h3 className="font-bold text-xl mb-4 text-white">Book Tickets</h3>
      
      {isLoading ? (
        <div className="text-white text-center py-4">Loading showtimes...</div>
      ) : (
        <div className="space-y-4">
          <TheaterSelector 
            selectedTheater={selectedTheater} 
            setSelectedTheater={setSelectedTheater} 
          />
          
          <DateSelector 
            availableDates={availableDates} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
          />
          
          <ShowtimeSelector 
            databaseShowtimes={databaseShowtimes} 
            selectedDate={selectedDate} 
            selectedShowtimeId={selectedShowtimeId} 
            setSelectedShowtimeId={setSelectedShowtimeId} 
            setSelectedShowtime={setSelectedShowtime} 
          />

          <SeatSelector 
            seatCount={seatCount} 
            setSeatCount={setSeatCount} 
          />
          
          <BookingFormActions 
            isAuthenticated={isAuthenticated}
            selectedTheater={selectedTheater}
            selectedShowtime={selectedShowtime}
            selectedDate={selectedDate}
            selectedShowtimeId={selectedShowtimeId}
            seatCount={seatCount}
            movieId={movieId}
            movieTitle={movieTitle}
            databaseShowtimes={databaseShowtimes}
          />
        </div>
      )}
    </div>
  );
};

export default BookingForm;
