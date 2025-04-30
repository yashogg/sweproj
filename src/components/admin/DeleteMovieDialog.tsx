
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
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the movie
          "{movie.title}" and all its associated showtimes.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteMovieDialog;
