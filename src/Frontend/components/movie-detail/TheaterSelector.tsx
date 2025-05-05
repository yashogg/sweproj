
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Available theaters
const theaters = [
  { id: 1, name: "Lubbock" },
  { id: 2, name: "Amarillo" },
  { id: 3, name: "Levelland" },
  { id: 4, name: "Plainview" },
  { id: 5, name: "Snyder" },
  { id: 6, name: "Abilene" }
];

interface TheaterSelectorProps {
  selectedTheater: string;
  setSelectedTheater: (theater: string) => void;
}

const TheaterSelector = ({ selectedTheater, setSelectedTheater }: TheaterSelectorProps) => {
  return (
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
  );
};

export default TheaterSelector;
