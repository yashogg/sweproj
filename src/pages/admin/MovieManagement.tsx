
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample movie data
const initialMovies = [
  { 
    id: 1, 
    title: "Spider-Man", 
    status: "Currently Showing",
    releaseDate: "April 1, 2025",
    showtimes: ["10:00 am", "12:00 pm", "2:00 pm", "4:00 pm", "7:00 pm"],
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man"
  },
  { 
    id: 2, 
    title: "The Batman", 
    status: "Upcoming",
    releaseDate: "May 15, 2025",
    showtimes: ["11:00 am", "1:30 pm", "4:30 pm", "7:30 pm", "10:00 pm"],
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Batman"
  },
  { 
    id: 3, 
    title: "Doctor Strange", 
    status: "Currently Showing",
    releaseDate: "March 20, 2025",
    showtimes: ["9:30 am", "12:15 pm", "3:00 pm", "5:45 pm", "8:30 pm"],
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Dr+Strange"
  }
];

const MovieManagement = () => {
  const [movies, setMovies] = useState(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState(initialMovies[0]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSearch = (query: string) => {
    if (!query) {
      setMovies(initialMovies);
      return;
    }
    
    const filtered = initialMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filtered);
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} movies matching "${query}"`
    });
  };
  
  const handleAdd = () => {
    navigate('/admin/movies/add');
  };
  
  const handleEdit = (id: number) => {
    toast({
      title: "Edit Movie",
      description: `Editing movie with ID: ${id}`
    });
  };
  
  const handleDelete = (id: number) => {
    toast({
      title: "Delete Movie",
      description: `Removing movie with ID: ${id}`
    });
  };
  
  const handleView = (id: number) => {
    toast({
      title: "View Movie",
      description: `Viewing movie with ID: ${id}`
    });
  };
  
  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie);
  };

  return (
    <AdminLayout title="Movie Management" showActions={true} onSearch={handleSearch} onAdd={handleAdd}>
      {selectedMovie ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title} 
                className="w-full h-auto object-cover rounded"
              />
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-gray-600 text-sm">Movie Title</h2>
                <p className="font-medium">{selectedMovie.title}</p>
              </div>
              
              <div>
                <h2 className="text-gray-600 text-sm">Status</h2>
                <p className="font-medium">{selectedMovie.status}</p>
              </div>
              
              <div>
                <h2 className="text-gray-600 text-sm">Release Date</h2>
                <p className="font-medium">{selectedMovie.releaseDate}</p>
              </div>
              
              <div>
                <h2 className="text-gray-600 text-sm">Showtime</h2>
                <p className="font-medium">{selectedMovie.showtimes.join(', ')}</p>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(selectedMovie.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(selectedMovie.id)}
                >
                  Delete
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleView(selectedMovie.id)}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p>Select a movie to view details</p>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">All Movies</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Movie Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Release Date</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr 
                  key={movie.id} 
                  className={`border-t border-gray-200 hover:bg-gray-50 cursor-pointer ${
                    selectedMovie && selectedMovie.id === movie.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleMovieSelect(movie)}
                >
                  <td className="px-4 py-3 text-sm">{movie.title}</td>
                  <td className="px-4 py-3 text-sm">{movie.status}</td>
                  <td className="px-4 py-3 text-sm">{movie.releaseDate}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(movie.id);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(movie.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(movie.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MovieManagement;
