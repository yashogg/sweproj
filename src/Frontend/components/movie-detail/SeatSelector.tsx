
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeatSelectorProps {
  seatCount: number;
  setSeatCount: (count: number) => void;
}

const SeatSelector = ({ seatCount, setSeatCount }: SeatSelectorProps) => {
  return (
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
  );
};

export default SeatSelector;
