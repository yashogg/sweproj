
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ShowtimeWithDetails } from '../../services/types';

interface BookingFormProps {
  movieId: string;
  movieTitle: string;
  isUpcoming: boolean;
  showtimes: ShowtimeWithDetails[];
}

const BookingForm = ({ movieId, movieTitle, isUpcoming, showtimes }: BookingFormProps) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [selectedTheater, setSelectedTheater] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Get unique dates from showtimes
  const dates = [...new Set(showtimes.map(s => s.date))];
  
  // Get theaters for selected date
  const theaters = selectedDate
    ? [...new Set(showtimes.filter(s => s.date === selectedDate).map(s => s.theater))]
    : [];
  
  // Get showtimes for selected date and theater
  const availableShowtimes = selectedDate && selectedTheater
    ? showtimes.filter(s => s.date === selectedDate && s.theater === selectedTheater).map(s => s.time)
    : [];
  
  // Get seats for selected showtime
  const availableSeats = selectedDate && selectedTheater && selectedShowtime
    ? showtimes.find(
        s => s.date === selectedDate && 
        s.theater === selectedTheater && 
        s.time === selectedShowtime
      )?.availableSeats || []
    : [];
  
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTheater('');
    setSelectedShowtime('');
    setSelectedSeats([]);
  };
  
  const handleTheaterChange = (theater: string) => {
    setSelectedTheater(theater);
    setSelectedShowtime('');
    setSelectedSeats([]);
  };
  
  const handleShowtimeChange = (time: string) => {
    setSelectedShowtime(time);
    setSelectedSeats([]);
  };
  
  const handleSeatToggle = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  
  const handleProceedToCheckout = () => {
    if (!selectedDate || !selectedTheater || !selectedShowtime || selectedSeats.length === 0) {
      return;
    }
    
    const selectedShowtimeObj = showtimes.find(
      s => s.date === selectedDate && s.theater === selectedTheater && s.time === selectedShowtime
    );
    
    if (!selectedShowtimeObj) return;
    
    // In a real app, we would use state management or context for this
    // For now, we'll pass the data via location state
    navigate('/checkout', {
      state: {
        movieId,
        movieTitle,
        date: selectedDate,
        theater: selectedTheater,
        showtime: selectedShowtime,
        seats: selectedSeats,
        price: selectedShowtimeObj.price,
        totalPrice: selectedShowtimeObj.price * selectedSeats.length
      }
    });
  };
  
  if (isUpcoming) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
        <div className="mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Coming Soon
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          This movie is not yet available for booking. Check back later for showtimes.
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Book Tickets</h2>
      
      {/* Date Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <div className="flex flex-wrap gap-2">
          {dates.length > 0 ? dates.map((date) => (
            <button
              key={date}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedDate === date
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleDateChange(date)}
            >
              {date}
            </button>
          )) : (
            <p className="text-gray-500 text-sm">No dates available</p>
          )}
        </div>
      </div>
      
      {/* Theater Selection */}
      {selectedDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Theater</label>
          <div className="flex flex-wrap gap-2">
            {theaters.map((theater) => (
              <button
                key={theater}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTheater === theater
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleTheaterChange(theater)}
              >
                {theater}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Showtime Selection */}
      {selectedDate && selectedTheater && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Showtime</label>
          <div className="flex flex-wrap gap-2">
            {availableShowtimes.map((time) => (
              <button
                key={time}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedShowtime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleShowtimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Seat Selection */}
      {selectedDate && selectedTheater && selectedShowtime && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Seats</label>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {availableSeats.map((seat) => (
              <button
                key={seat}
                className={`p-2 text-xs rounded-md ${
                  selectedSeats.includes(seat)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleSeatToggle(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
          {selectedSeats.length > 0 && (
            <div className="text-sm text-gray-600">
              Selected: {selectedSeats.join(', ')}
            </div>
          )}
        </div>
      )}
      
      {/* Action Button */}
      <Button
        onClick={handleProceedToCheckout}
        disabled={!selectedDate || !selectedTheater || !selectedShowtime || selectedSeats.length === 0}
        className="w-full"
      >
        {selectedSeats.length > 0 
          ? `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''}`
          : 'Select Seats to Book'}
      </Button>
    </div>
  );
};

export default BookingForm;
