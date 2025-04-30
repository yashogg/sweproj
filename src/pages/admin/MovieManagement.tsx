
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash2, Plus, Clock, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample movie data for the management page
const initialMovies = [
  { 
    id: 1, 
    title: "Spider-Man: No Way Home", 
    status: "Now Playing",
    showtimes: [
      { id: 1, time: "10:30 AM", date: "2025-05-01", price: 12.99 },
      { id: 2, time: "1:45 PM", date: "2025-05-01", price: 12.99 },
      { id: 3, time: "5:15 PM", date: "2025-05-01", price: 14.99 },
      { id: 4, time: "8:30 PM", date: "2025-05-01", price: 14.99 }
    ]
  },
  { 
    id: 2, 
    title: "The Batman", 
    status: "Now Playing",
    showtimes: [
      { id: 5, time: "11:00 AM", date: "2025-05-01", price: 12.99 },
      { id: 6, time: "2:15 PM", date: "2025-05-01", price: 12.99 },
      { id: 7, time: "5:45 PM", date: "2025-05-01", price: 14.99 },
      { id: 8, time: "9:00 PM", date: "2025-05-01", price: 14.99 }
    ]
  },
  { 
    id: 13, 
    title: "Dune: Part Two", 
    status: "Upcoming",
    showtimes: [
      { id: 9, time: "12:00 PM", date: "2025-06-15", price: 14.99 },
      { id: 10, time: "3:30 PM", date: "2025-06-15", price: 14.99 },
      { id: 11, time: "7:00 PM", date: "2025-06-15", price: 16.99 },
      { id: 12, time: "10:15 PM", date: "2025-06-15", price: 16.99 }
    ]
  }
];

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

const MovieManagement = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
  const [newShowtime, setNewShowtime] = useState({
    time: "",
    date: "",
    price: 12.99
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEditShowtimes = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleAddShowtime = () => {
    if (!selectedMovie || !newShowtime.time || !newShowtime.date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(newShowtime.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast({
        title: "Invalid Date",
        description: "Cannot add showtimes for past dates",
        variant: "destructive"
      });
      return;
    }

    // Validate price is positive
    if (newShowtime.price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Price must be greater than zero",
        variant: "destructive"
      });
      return;
    }

    const updatedMovie = {
      ...selectedMovie,
      showtimes: [
        ...selectedMovie.showtimes,
        {
          id: Math.floor(Math.random() * 1000) + 100, // Generate a random ID
          ...newShowtime
        }
      ]
    };

    setMovies(movies.map(m => m.id === selectedMovie.id ? updatedMovie : m));
    setSelectedMovie(updatedMovie);
    setNewShowtime({ time: "", date: "", price: 12.99 });

    toast({
      title: "Showtime Added",
      description: `New showtime added for ${selectedMovie.title}`
    });
  };

  const handleDeleteShowtime = (movieId: number, showtimeId: number) => {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    const updatedShowtimes = movie.showtimes.filter(s => s.id !== showtimeId);
    const updatedMovie = { ...movie, showtimes: updatedShowtimes };
    const updatedMovies = movies.map(m => m.id === movieId ? updatedMovie : m);
    
    setMovies(updatedMovies);
    setSelectedMovie(updatedMovie);
    
    toast({
      title: "Showtime Removed",
      description: `Showtime removed from ${movie.title}`
    });
  };

  const handleUpdateShowtime = (movieId: number, showtimeId: number, field: string, value: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    // Validation for date field
    if (field === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast({
          title: "Invalid Date",
          description: "Cannot schedule showtimes for past dates",
          variant: "destructive"
        });
        return;
      }
    }

    // Validation for price field
    if (field === 'price') {
      const price = parseFloat(value);
      if (isNaN(price) || price <= 0) {
        toast({
          title: "Invalid Price",
          description: "Price must be a positive number",
          variant: "destructive"
        });
        return;
      }
    }

    const updatedShowtimes = movie.showtimes.map(s => {
      if (s.id === showtimeId) {
        if (field === 'price') {
          return { ...s, [field]: parseFloat(value) };
        }
        return { ...s, [field]: value };
      }
      return s;
    });

    const updatedMovie = { ...movie, showtimes: updatedShowtimes };
    const updatedMovies = movies.map(m => m.id === movieId ? updatedMovie : m);
    
    setMovies(updatedMovies);
    setSelectedMovie(updatedMovie);
  };

  const handleDeleteMovie = (movie: Movie) => {
    const updatedMovies = movies.filter(m => m.id !== movie.id);
    setMovies(updatedMovies);
    
    toast({
      title: "Movie Deleted",
      description: `${movie.title} has been deleted`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout title="Movie Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Movies</h1>
          <Button onClick={() => navigate('/admin/movies/add')}>
            <Plus className="w-4 h-4 mr-2" /> Add New Movie
          </Button>
        </div>

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
                        onClick={() => handleEditShowtimes(movie)}
                      >
                        <Clock className="w-4 h-4 mr-1" /> Showtimes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Manage Showtimes for {selectedMovie?.title}</DialogTitle>
                        <DialogDescription>
                          Add, edit or remove showtimes for this movie.
                        </DialogDescription>
                      </DialogHeader>

                      {selectedMovie && (
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
                                {selectedMovie.showtimes.map((showtime) => (
                                  <TableRow key={showtime.id}>
                                    <TableCell>
                                      <Input 
                                        type="date" 
                                        value={showtime.date} 
                                        onChange={(e) => handleUpdateShowtime(
                                          selectedMovie.id, 
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
                                          handleUpdateShowtime(
                                            selectedMovie.id, 
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
                                        min="0" 
                                        step="0.01" 
                                        value={showtime.price} 
                                        onChange={(e) => handleUpdateShowtime(
                                          selectedMovie.id, 
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
                                        onClick={() => handleDeleteShowtime(selectedMovie.id, showtime.id)}
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
                      )}

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Done</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
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
                        onClick={() => setMovieToDelete(movie)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the movie
                          "{movieToDelete?.title}" and all its associated showtimes.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setMovieToDelete(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => {
                            if (movieToDelete) {
                              handleDeleteMovie(movieToDelete);
                              setMovieToDelete(null);
                            }
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default MovieManagement;
