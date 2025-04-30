
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
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [errors, setErrors] = useState<{
    time?: string;
    date?: string;
    price?: string;
  }>({});

  const validateNewShowtime = () => {
    const newErrors: {
      time?: string;
      date?: string;
      price?: string;
    } = {};
    
    if (!newShowtime.time.trim()) {
      newErrors.time = "Time is required";
    }
    
    if (!newShowtime.date.trim()) {
      newErrors.date = "Date is required";
    } else {
      // Validate date is not in the past
      const selectedDate = new Date(newShowtime.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Cannot add showtimes for past dates";
      }
    }
    
    if (newShowtime.price <= 0) {
      newErrors.price = "Price must be greater than zero";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddShowtime = () => {
    if (validateNewShowtime()) {
      onAddShowtime();
      setNewShowtime({ time: "", date: "", price: 12.99 });
      setErrors({});
    }
  };

  if (!movie) {
    return (
      <div className="p-8 text-center text-gray-500">
        Select a movie to manage showtimes
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-md overflow-hidden">
        {movie.showtimes.length > 0 ? (
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
                      aria-label="Showtime date"
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
                      aria-label="Showtime time"
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
                      aria-label="Showtime price"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDeleteShowtime(movie.id, showtime.id)}
                      aria-label={`Delete showtime at ${showtime.time}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No showtimes available for this movie. Add one below.
          </div>
        )}
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
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <p id="date-error" className="text-sm text-red-500 mt-1">{errors.date}</p>
            )}
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
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? "time-error" : undefined}
            />
            {errors.time && (
              <p id="time-error" className="text-sm text-red-500 mt-1">{errors.time}</p>
            )}
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
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? "price-error" : undefined}
            />
            {errors.price && (
              <p id="price-error" className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>
        </div>
        
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors above before adding a new showtime.
            </AlertDescription>
          </Alert>
        )}
        
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
