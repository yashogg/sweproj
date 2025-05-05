
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShowtimeWithDetails } from "../../services/types";

interface ShowtimeSelectorProps {
  databaseShowtimes: ShowtimeWithDetails[];
  selectedDate: string;
  selectedShowtimeId: string;
  setSelectedShowtimeId: (id: string) => void;
  setSelectedShowtime: (time: string) => void;
}

const ShowtimeSelector = ({ 
  databaseShowtimes, 
  selectedDate, 
  selectedShowtimeId, 
  setSelectedShowtimeId, 
  setSelectedShowtime 
}: ShowtimeSelectorProps) => {
  return (
    <div>
      <label className="block text-gray-400 text-sm mb-1">Select Showtime</label>
      <Select
        value={selectedShowtimeId}
        onValueChange={(value) => {
          setSelectedShowtimeId(value);
          // Find the showtime in the database to set the time
          const showtime = databaseShowtimes.find(st => st.id === value);
          if (showtime) {
            setSelectedShowtime(showtime.time);
          }
        }}
        disabled={!selectedDate}
      >
        <SelectTrigger className="w-full bg-ticketeer-purple-darker border-ticketeer-purple-dark text-white">
          <SelectValue placeholder="Select Showtime" />
        </SelectTrigger>
        <SelectContent>
          {databaseShowtimes
            .filter(show => show.date === selectedDate)
            .map(show => (
              <SelectItem key={show.id} value={show.id}>
                {show.time} - ${show.price.toFixed(2)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShowtimeSelector;
