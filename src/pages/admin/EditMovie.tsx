
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
import { getMovieById, updateMovie } from '@/components/home/MovieData';

interface MovieDetails {
  id: number;
  title: string;
  genre: string;
  description: string;
  cast: string;
  posterUrl: string;
  imagePath: string;
  status: string;
  releaseDate: string;
  rating: number;
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
    imagePath: '',
    status: '',
    releaseDate: '',
    rating: 0
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const movieId = parseInt(id);
    const movie = getMovieById(movieId);
    
    if (movie) {
      setFormData({
        id: movie.id,
        title: movie.title,
        genre: movie.genre || '',
        description: movie.description || '',
        cast: movie.cast || '',
        posterUrl: movie.imagePath,
        imagePath: movie.imagePath,
        status: movie.releaseDate > new Date().toISOString().split('T')[0] ? 'upcoming' : 'nowPlaying',
        releaseDate: movie.releaseDate || new Date().toISOString().split('T')[0],
        rating: movie.rating || 0
      });
      
      setImagePreview(movie.imagePath);
    } else {
      // Movie not found
      toast({
        title: "Error",
        description: "Movie not found",
        variant: "destructive"
      });
      navigate('/admin/movies');
    }
    
    setLoading(false);
  }, [id, navigate, toast]);
  
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
    // For now, just update the form data with the preview URL
    setFormData({ 
      ...formData, 
      posterUrl: previewUrl,
      imagePath: previewUrl  // Update both fields
    });
  };
  
  const validateForm = () => {
    // Check required fields
    if (!formData.title || !formData.description || !formData.status) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate rating
    if (formData.rating < 0 || formData.rating > 10) {
      toast({
        title: "Invalid Rating",
        description: "Rating must be between 0 and 10",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate release date
    if (!formData.releaseDate) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid release date",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // In a real app, this would save to a database
    try {
      const updatedMovie = updateMovie({
        id: formData.id,
        title: formData.title,
        genre: formData.genre,
        description: formData.description,
        cast: formData.cast,
        imagePath: formData.imagePath,
        rating: Number(formData.rating),
        releaseDate: formData.releaseDate,
        status: formData.status
      });
      
      if (updatedMovie) {
        toast({
          title: "Success",
          description: "Movie updated successfully"
        });
        navigate('/admin/movies');
      } else {
        toast({
          title: "Error",
          description: "Failed to update movie",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the movie",
        variant: "destructive"
      });
    }
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
                Movie Title<span className="text-red-500">*</span>
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
                Genre<span className="text-red-500">*</span>
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
                Description<span className="text-red-500">*</span>
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
                Status<span className="text-red-500">*</span>
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
                Release Date<span className="text-red-500">*</span>
              </label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full"
                required
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
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to keep the current image
                  </p>
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
