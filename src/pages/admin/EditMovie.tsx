
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { NOW_PLAYING, UPCOMING } from '@/components/home/MovieData';

interface MovieDetails {
  id: number;
  title: string;
  genre: string;
  description: string;
  cast: string;
  posterUrl: string;
  status: string;
  releaseDate: string;
  rating?: number;
}

const EditMovie = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<MovieDetails>({
    id: 0,
    title: '',
    genre: '',
    description: '',
    cast: '',
    posterUrl: '',
    status: '',
    releaseDate: '',
    rating: 0
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll just fetch from our sample data
    if (!id) return;
    
    const movieId = parseInt(id);
    const allMovies = [...NOW_PLAYING, ...UPCOMING];
    const movie = allMovies.find(m => m.id === movieId);
    
    if (movie) {
      setFormData({
        id: movie.id,
        title: movie.title,
        genre: 'Action/Adventure', // Placeholder as it's not in our sample data
        description: 'Movie description', // Placeholder
        cast: 'Actor 1, Actor 2', // Placeholder
        posterUrl: movie.imagePath,
        status: NOW_PLAYING.some(m => m.id === movieId) ? 'nowPlaying' : 'upcoming',
        releaseDate: '2025-05-01', // Placeholder
        rating: movie.rating
      });
      
      setImagePreview(movie.imagePath);
    }
    
    setLoading(false);
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validation for image files
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // In a real app, you would upload this file to a server
    // For now, just update the form data with a placeholder
    setFormData({ ...formData, posterUrl: previewUrl });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.title || !formData.genre || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would save the movie data to a database
    toast({
      title: "Success",
      description: "Movie updated successfully."
    });
    
    // Navigate back to movie management
    navigate('/admin/movies');
  };
  
  if (loading) {
    return (
      <AdminLayout title="Edit Movie">
        <div className="flex justify-center items-center h-64">
          <p>Loading movie details...</p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title={`Edit Movie: ${formData.title}`}>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Edit Movie</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Movie Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
                rows={4}
                required
              />
            </div>
            
            <div>
              <label htmlFor="cast" className="block text-sm font-medium text-gray-700 mb-1">
                Cast
              </label>
              <Input
                id="cast"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className="w-full"
                placeholder="Separate names with commas"
              />
            </div>
            
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating (0-10)
              </label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select 
                name="status"
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="nowPlaying">Currently Showing</SelectItem>
                  <SelectItem value="finished">No Longer Showing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                Release Date
              </label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">
                Poster Image
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    id="poster"
                    name="poster"
                    type="file"
                    className="w-full"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  {imagePreview && (
                    <Card className="overflow-hidden">
                      <CardContent className="p-1">
                        <img 
                          src={imagePreview} 
                          alt="Movie poster preview" 
                          className="w-full h-40 object-cover"
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/movies')}>
              Cancel
            </Button>
            <Button type="submit">
              Update Movie
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditMovie;
