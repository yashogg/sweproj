
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog } from "@/components/ui/dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { NOW_PLAYING, UPCOMING, deleteMovie } from '@/components/home/MovieData';

// Import our new components
import MovieTable from '@/components/admin/MovieTable';
import ShowtimeDialog from '@/components/admin/ShowtimeDialog';
import DeleteMovieDialog from '@/components/admin/DeleteMovieDialog';

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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newShowtime, setNewShowtime] = useState({
    time: "",
    date: "",
    price: 12.99
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load movies from our data source
  useEffect(() => {
    // Convert our movie data to the format expected by this component
    const convertedMovies = [
      ...NOW_PLAYING.map(movie => ({
        id: movie.id,
        title: movie.title,
        status: "Now Playing",
        showtimes: [
          { id: movie.id * 10 + 1, time: "10:30 AM", date: movie.releaseDate, price: 12.99 },
          { id: movie.id * 10 + 2, time: "1:45 PM", date: movie.releaseDate, price: 12.99 },
          { id: movie.id * 10 + 3, time: "5:15 PM", date: movie.releaseDate, price: 14.99 },
        ]
      })),
      ...UPCOMING.map(movie => ({
        id: movie.id,
        title: movie.title,
        status: "Upcoming",
        showtimes: [
          { id: movie.id * 10 + 1, time: "12:00 PM", date: movie.releaseDate, price: 14.99 },
          { id: movie.id * 10 + 2, time: "3:30 PM", date: movie.releaseDate, price: 14.99 },
        ]
      }))
    ];
    
    setMovies(convertedMovies);
  }, []);

  const handleEditShowtimes = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If search is cleared, reset to show all movies
      const convertedMovies = [
        ...NOW_PLAYING.map(movie => ({
          id: movie.id,
          title: movie.title,
          status: "Now Playing",
          showtimes: [
            { id: movie.id * 10 + 1, time: "10:30 AM", date: movie.releaseDate, price: 12.99 },
            { id: movie.id * 10 + 2, time: "1:45 PM", date: movie.releaseDate, price: 12.99 },
            { id: movie.id * 10 + 3, time: "5:15 PM", date: movie.releaseDate, price: 14.99 },
          ]
        })),
        ...UPCOMING.map(movie => ({
          id: movie.id,
          title: movie.title,
          status: "Upcoming",
          showtimes: [
            { id: movie.id * 10 + 1, time: "12:00 PM", date: movie.releaseDate, price: 14.99 },
            { id: movie.id * 10 + 2, time: "3:30 PM", date: movie.releaseDate, price: 14.99 },
          ]
        }))
      ];
      setMovies(convertedMovies);
      return;
    }
    
    // Filter movies based on search term
    const filteredMovies = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setMovies(filteredMovies);
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
    try {
      // Delete the movie from our data source
      const result = deleteMovie(movie.id);
      
      if (result) {
        // Remove from UI state
        const updatedMovies = movies.filter(m => m.id !== movie.id);
        setMovies(updatedMovies);
        
        toast({
          title: "Movie Deleted",
          description: `${movie.title} has been deleted`
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete movie",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while deleting the movie",
        variant: "destructive"
      });
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <AdminLayout 
      title="Movie Management" 
      showActions={true}
      onSearch={handleSearch}
      onAdd={() => navigate('/admin/movies/add')}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Movies</h1>
          <Button onClick={() => navigate('/admin/movies/add')} className="bg-ticketeer-yellow hover:bg-yellow-400 text-black">
            <Plus className="w-4 h-4 mr-2" /> Add New Movie
          </Button>
        </div>

        <form onSubmit={handleSearchSubmit} className="mb-4 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search movies..."
            className="border rounded-l px-4 py-2 w-64"
          />
          <Button type="submit" className="rounded-l-none">Search</Button>
        </form>

        <MovieTable 
          movies={movies} 
          onEditShowtimes={handleEditShowtimes}
          onDeleteConfirm={setMovieToDelete}
        />

        {/* Showtime Management Dialog */}
        <Dialog>
          <ShowtimeDialog 
            selectedMovie={selectedMovie}
            onUpdateShowtime={handleUpdateShowtime}
            onDeleteShowtime={handleDeleteShowtime}
            onAddShowtime={handleAddShowtime}
          />
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog>
          <DeleteMovieDialog 
            movie={movieToDelete}
            onCancel={() => setMovieToDelete(null)}
            onConfirm={() => {
              if (movieToDelete) {
                handleDeleteMovie(movieToDelete);
                setMovieToDelete(null);
              }
            }}
          />
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default MovieManagement;
