
import React from 'react';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
}

interface DeleteMovieDialogProps {
  movie: Movie | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteMovieDialog = ({ movie, onCancel, onConfirm }: DeleteMovieDialogProps) => {
  if (!movie) return null;
  
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        </div>
        <AlertDialogDescription className="space-y-3">
          <p className="font-medium">
            Are you absolutely sure you want to delete "{movie.title}"?
          </p>
          <p>
            This action cannot be undone. This will permanently delete the movie
            and all its associated showtimes from our servers.
          </p>
          <p className="text-sm text-gray-500">
            Note: Any tickets purchased for this movie's showtimes will still be 
            maintained in the system for record-keeping purposes.
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          onClick={onConfirm} 
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          Yes, Delete Movie
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteMovieDialog;
