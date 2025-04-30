
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Film, PlusCircle, MoreVertical, Edit, Trash, Calendar, Clock, Search } from 'lucide-react';

// Sample movie data
const sampleMovies = [
  { 
    id: 1, 
    title: "Spider-Man: No Way Home", 
    genre: "Action, Adventure, Sci-Fi",
    releaseDate: "2021-12-17", 
    duration: "148",
    status: "Now Playing",
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man" 
  },
  { 
    id: 2, 
    title: "The Batman", 
    genre: "Action, Crime, Drama",
    releaseDate: "2022-03-04", 
    duration: "176",
    status: "Now Playing",
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Batman" 
  },
  { 
    id: 3, 
    title: "Doctor Strange in the Multiverse of Madness", 
    genre: "Action, Adventure, Fantasy",
    releaseDate: "2022-05-06", 
    duration: "126",
    status: "Now Playing",
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Dr+Strange" 
  },
  { 
    id: 4, 
    title: "Dune: Part Two", 
    genre: "Action, Adventure, Sci-Fi",
    releaseDate: "2023-10-20", 
    duration: "155",
    status: "Upcoming",
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Dune+2" 
  },
  { 
    id: 5, 
    title: "The Marvels", 
    genre: "Action, Adventure, Sci-Fi",
    releaseDate: "2023-11-10", 
    duration: "135",
    status: "Upcoming",
    image: "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=The+Marvels" 
  }
];

const AdminMovies = () => {
  const [movies, setMovies] = useState(sampleMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [addMovieOpen, setAddMovieOpen] = useState(false);
  const [editMovie, setEditMovie] = useState<null | typeof sampleMovies[0]>(null);
  const { toast } = useToast();
  
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    releaseDate: '',
    duration: '',
    status: 'Upcoming',
    image: ''
  });
  
  const filteredMovies = searchTerm 
    ? movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movies;
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddMovieChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMovie({...newMovie, [name]: value});
  };
  
  const handleEditMovieChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editMovie) {
      setEditMovie({...editMovie, [name]: value});
    }
  };
  
  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newMovie.title || !newMovie.genre || !newMovie.releaseDate || !newMovie.duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Add movie with a new ID
    const newMovieWithId = {
      ...newMovie,
      id: Math.max(...movies.map(movie => movie.id)) + 1
    };
    
    setMovies([...movies, newMovieWithId]);
    setAddMovieOpen(false);
    
    // Reset form
    setNewMovie({
      title: '',
      genre: '',
      releaseDate: '',
      duration: '',
      status: 'Upcoming',
      image: ''
    });
    
    toast({
      title: "Movie added",
      description: `${newMovie.title} has been added successfully.`
    });
  };
  
  const handleUpdateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editMovie) return;
    
    // Validation
    if (!editMovie.title || !editMovie.genre || !editMovie.releaseDate || !editMovie.duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Update movie
    const updatedMovies = movies.map(movie => 
      movie.id === editMovie.id ? editMovie : movie
    );
    
    setMovies(updatedMovies);
    setEditMovie(null);
    
    toast({
      title: "Movie updated",
      description: `${editMovie.title} has been updated successfully.`
    });
  };
  
  const handleDeleteMovie = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete '${title}'?`)) {
      setMovies(movies.filter(movie => movie.id !== id));
      toast({
        title: "Movie deleted",
        description: `${title} has been removed from the catalog.`
      });
    }
  };

  return (
    <Layout title="Manage Movies" requireAuth={true} requireAdmin={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Movie Management</h1>
          
          <Dialog open={addMovieOpen} onOpenChange={setAddMovieOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Movie</DialogTitle>
                <DialogDescription>
                  Add a new movie to your theater's catalog
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddMovie} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Movie title"
                    value={newMovie.title}
                    onChange={handleAddMovieChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="genre" className="block text-sm font-medium mb-1">Genre</label>
                  <Input
                    id="genre"
                    name="genre"
                    placeholder="Action, Adventure, Comedy, etc."
                    value={newMovie.genre}
                    onChange={handleAddMovieChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium mb-1">Release Date</label>
                    <Input
                      id="releaseDate"
                      name="releaseDate"
                      type="date"
                      value={newMovie.releaseDate}
                      onChange={handleAddMovieChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (min)</label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      placeholder="90"
                      value={newMovie.duration}
                      onChange={handleAddMovieChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={newMovie.status}
                    onChange={handleAddMovieChange}
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="Now Playing">Now Playing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-sm font-medium mb-1">Poster Image URL</label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={newMovie.image}
                    onChange={handleAddMovieChange}
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setAddMovieOpen(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                    Add Movie
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Edit Movie Dialog */}
        <Dialog open={!!editMovie} onOpenChange={(open) => !open && setEditMovie(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Movie</DialogTitle>
              <DialogDescription>
                Update movie details in your catalog
              </DialogDescription>
            </DialogHeader>
            
            {editMovie && (
              <form onSubmit={handleUpdateMovie} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    id="edit-title"
                    name="title"
                    placeholder="Movie title"
                    value={editMovie.title}
                    onChange={handleEditMovieChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-genre" className="block text-sm font-medium mb-1">Genre</label>
                  <Input
                    id="edit-genre"
                    name="genre"
                    placeholder="Action, Adventure, Comedy, etc."
                    value={editMovie.genre}
                    onChange={handleEditMovieChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-releaseDate" className="block text-sm font-medium mb-1">Release Date</label>
                    <Input
                      id="edit-releaseDate"
                      name="releaseDate"
                      type="date"
                      value={editMovie.releaseDate}
                      onChange={handleEditMovieChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-duration" className="block text-sm font-medium mb-1">Duration (min)</label>
                    <Input
                      id="edit-duration"
                      name="duration"
                      type="number"
                      value={editMovie.duration}
                      onChange={handleEditMovieChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium mb-1">Status</label>
                  <select
                    id="edit-status"
                    name="status"
                    value={editMovie.status}
                    onChange={handleEditMovieChange}
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="Now Playing">Now Playing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="edit-image" className="block text-sm font-medium mb-1">Poster Image URL</label>
                  <Input
                    id="edit-image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={editMovie.image}
                    onChange={handleEditMovieChange}
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditMovie(null)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                    Update Movie
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search movies by title, genre or status..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Movies Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Poster</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>
                      <div className="w-12 h-16 rounded overflow-hidden">
                        <img 
                          src={movie.image || "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=No+Image"} 
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{movie.title}</TableCell>
                    <TableCell>{movie.genre}</TableCell>
                    <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                    <TableCell>{movie.duration} min</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        movie.status === 'Now Playing' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {movie.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditMovie(movie)} className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteMovie(movie.id, movie.title)} className="cursor-pointer text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Film className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No movies found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search or add a new movie</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMovies;
