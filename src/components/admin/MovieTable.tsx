
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Clock, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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

interface MovieTableProps {
  movies: Movie[];
  onEditShowtimes: (movie: Movie) => void;
  onDeleteConfirm: (movie: Movie) => void;
}

const MovieTable = ({ 
  movies, 
  onEditShowtimes, 
  onDeleteConfirm 
}: MovieTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%]">ID</TableHead>
          <TableHead className="w-[40%]">Movie Title</TableHead>
          <TableHead className="w-[15%]">Status</TableHead>
          <TableHead className="w-[20%]">Showtimes</TableHead>
          <TableHead className="w-[20%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.id}>
            <TableCell className="font-medium">{movie.id}</TableCell>
            <TableCell>{movie.title}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                movie.status === 'Now Playing' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {movie.status}
              </span>
            </TableCell>
            <TableCell>{movie.showtimes.length} showtimes</TableCell>
            <TableCell className="text-right space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditShowtimes(movie)}
                  >
                    <Clock className="w-4 h-4 mr-1" /> Showtimes
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteConfirm(movie)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;
