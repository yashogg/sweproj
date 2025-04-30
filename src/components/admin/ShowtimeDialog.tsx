
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
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Manage Showtimes for {selectedMovie?.title}</DialogTitle>
        <DialogDescription>
          Add, edit or remove showtimes for this movie.
        </DialogDescription>
      </DialogHeader>

      <ShowtimeManager 
        movie={selectedMovie}
        onUpdateShowtime={onUpdateShowtime}
        onDeleteShowtime={onDeleteShowtime}
        onAddShowtime={onAddShowtime}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button>Done</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default ShowtimeDialog;
