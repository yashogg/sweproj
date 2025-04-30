
import React from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import ShowtimeManager from './ShowtimeManager';
import { Badge } from '@/components/ui/badge';

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

interface ShowtimeDialogProps {
  selectedMovie: Movie | null;
  onUpdateShowtime: (movieId: number, showtimeId: number, field: string, value: string) => void;
  onDeleteShowtime: (movieId: number, showtimeId: number) => void;
  onAddShowtime: () => void;
}

const ShowtimeDialog = ({
  selectedMovie,
  onUpdateShowtime,
  onDeleteShowtime,
  onAddShowtime
}: ShowtimeDialogProps) => {
  if (!selectedMovie) return null;
  
  return (
    <DialogContent className="max-w-3xl" aria-labelledby="showtime-dialog-title">
      <DialogHeader>
        <DialogTitle id="showtime-dialog-title">
          <div className="flex items-center gap-3">
            <span>Manage Showtimes for {selectedMovie.title}</span>
            <Badge variant={selectedMovie.status === 'Now Playing' ? 'default' : 'outline'}>
              {selectedMovie.status}
            </Badge>
          </div>
        </DialogTitle>
        <DialogDescription>
          Add, edit or remove showtimes for this movie. Changes will be reflected immediately.
        </DialogDescription>
      </DialogHeader>

      <ShowtimeManager 
        movie={selectedMovie}
        onUpdateShowtime={onUpdateShowtime}
        onDeleteShowtime={onDeleteShowtime}
        onAddShowtime={onAddShowtime}
      />

      <DialogFooter className="sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedMovie.showtimes.length} {selectedMovie.showtimes.length === 1 ? 'showtime' : 'showtimes'} total
        </div>
        <DialogClose asChild>
          <Button>Done</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default ShowtimeDialog;
