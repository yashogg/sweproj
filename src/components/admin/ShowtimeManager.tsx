
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Showtime {
  id: number;
  time: string;
  date: string;
  price: number;
}

interface Movie {
  id: number;
  title: string;
  status: string;
  showtimes: Showtime[];
}

interface ShowtimeManagerProps {
  movie: Movie | null;
  onUpdateShowtime: (movieId: number, showtimeId: number, field: string, value: string) => void;
  onDeleteShowtime: (movieId: number, showtimeId: number) => void;
  onAddShowtime: () => void;
}

const ShowtimeManager = ({
  movie,
  onUpdateShowtime,
  onDeleteShowtime,
  onAddShowtime
}: ShowtimeManagerProps) => {
  const { toast } = useToast();
  const [newShowtime, setNewShowtime] = useState({
    time: "",
    date: "",
    price: 12.99
  });

  const handleAddShowtime = () => {
    onAddShowtime();
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movie.showtimes.map((showtime) => (
              <TableRow key={showtime.id}>
                <TableCell>
                  <Input 
                    type="date" 
                    value={showtime.date} 
                    onChange={(e) => onUpdateShowtime(
                      movie.id, 
                      showtime.id, 
                      'date', 
                      e.target.value
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="time" 
                    value={showtime.time.split(' ')[0]} 
                    onChange={(e) => {
                      const time = e.target.value;
                      // Convert 24h to 12h format for display
                      const date = new Date(`2000-01-01T${time}`);
                      const formattedTime = date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      });
                      onUpdateShowtime(
                        movie.id, 
                        showtime.id, 
                        'time', 
                        formattedTime
                      );
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    min="0.01" 
                    step="0.01" 
                    value={showtime.price} 
                    onChange={(e) => onUpdateShowtime(
                      movie.id, 
                      showtime.id, 
                      'price', 
                      e.target.value
                    )}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteShowtime(movie.id, showtime.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-4">Add New Showtime</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date"
              value={newShowtime.date}
              min={new Date().toISOString().split('T')[0]} // Prevent selecting dates in the past
              onChange={(e) => setNewShowtime({...newShowtime, date: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time" 
              type="time"
              value={newShowtime.time}
              onChange={(e) => {
                const time = e.target.value;
                // Convert 24h to 12h format for display
                const date = new Date(`2000-01-01T${time}`);
                const formattedTime = date.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                });
                setNewShowtime({...newShowtime, time: formattedTime});
              }}
            />
          </div>
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input 
              id="price" 
              type="number"
              min="0.01"
              step="0.01"
              value={newShowtime.price}
              onChange={(e) => setNewShowtime({
                ...newShowtime, 
                price: parseFloat(e.target.value)
              })}
            />
          </div>
        </div>
        <Button 
          onClick={handleAddShowtime}
          className="mt-4"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Showtime
        </Button>
      </div>
    </div>
  );
};

export default ShowtimeManager;
