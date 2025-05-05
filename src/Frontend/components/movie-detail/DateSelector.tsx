
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateSelectorProps {
  availableDates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const DateSelector = ({ availableDates, selectedDate, setSelectedDate }: DateSelectorProps) => {
  return (
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
  );
};

export default DateSelector;
