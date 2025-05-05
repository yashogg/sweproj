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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getMovieById, updateMovie } from '@/Frontend/services/movie-service';
import { v4 as uuidv4 } from 'uuid';

interface MovieDetails {
  id: string;
  title: string;
  genre: string;
  description: string;
  cast_members: string | null;
  image_path: string | null;
  status: string;
  release_date: string | null;
  rating: number | null;
  duration: number | null; // Added duration field
}

const EditMovie = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<MovieDetails>({
    id: '',
    title: '',
    genre: '',
    description: '',
    cast_members: '',
    image_path: '',
    status: '',
    release_date: '',
    rating: 0,
    duration: 120 // Added default duration
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newPoster, setNewPoster] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Map DB status to form status
  const mapStatusToFormStatus = (dbStatus: string): string => {
    const statusMap: Record<string, string> = {
      'Now Playing': 'nowPlaying',
      'Upcoming': 'upcoming',
      'Finished': 'finished'
    };
    return statusMap[dbStatus] || 'upcoming';
  };
  
  // Map form status to DB status
  const mapFormStatusToDbStatus = (formStatus: string): 'Now Playing' | 'Upcoming' | 'Finished' => {
    const statusMap: Record<string, 'Now Playing' | 'Upcoming' | 'Finished'> = {
      'nowPlaying': 'Now Playing',
      'upcoming': 'Upcoming',
      'finished': 'Finished'
    };
    return statusMap[formStatus] || 'Upcoming';
  };
  
  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError("No movie ID provided");
        setLoading(false);
        return;
      }
      
      try {
        const movie = await getMovieById(id);
        
        if (movie) {
          setFormData({
            id: movie.id,
            title: movie.title,
            genre: movie.genre || '',
            description: movie.description || '',
            cast_members: movie.cast_members || '',
            image_path: movie.image_path,
            status: mapStatusToFormStatus(movie.status),
            release_date: movie.release_date || new Date().toISOString().split('T')[0],
            rating: movie.rating || 0,
            duration: movie.duration || 120 // Added default duration
          });
          
          if (movie.image_path) {
            setImagePreview(movie.image_path);
          }
        } else {
          // Movie not found
          setError("Movie not found");
          toast({
            title: "Error",
            description: "Movie not found",
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError("Error loading movie data");
        toast({
          title: "Error",
          description: "Failed to load movie data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id, toast]);
  
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
    setNewPoster(file);
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
    if (formData.rating !== null && 
        (formData.rating < 0 || formData.rating > 10)) {
      toast({
        title: "Invalid Rating",
        description: "Rating must be between 0 and 10",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate release date
    if (!formData.release_date) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid release date",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Handle poster update if there's a new file
      let imageUrl = formData.image_path;
      if (newPoster && imagePreview) {
        // In this simplified version, we'll just use the preview URL
        imageUrl = imagePreview;
      }
      
      // Update movie in database
      const movieData = {
        title: formData.title,
        genre: formData.genre,
        description: formData.description,
        cast_members: formData.cast_members || null,
        image_path: imageUrl,
        status: mapFormStatusToDbStatus(formData.status),
        release_date: formData.release_date,
        rating: typeof formData.rating === 'string' 
                ? parseFloat(formData.rating) 
                : formData.rating,
        duration: formData.duration // Added duration field
      };
      
      await updateMovie(id!, movieData);
      
      toast({
        title: "Success",
        description: "Movie updated successfully"
      });
      navigate('/admin/movies');
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the movie",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
  
  if (error) {
    return (
      <AdminLayout title="Edit Movie">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex justify-center mt-4">
          <Button onClick={() => navigate('/admin/movies')}>
            Return to Movies
          </Button>
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
              <label htmlFor="cast_members" className="block text-sm font-medium text-gray-700 mb-1">
                Cast
              </label>
              <Input
                id="cast_members"
                name="cast_members"
                value={formData.cast_members || ''}
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
                value={formData.rating || ''}
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
              <label htmlFor="release_date" className="block text-sm font-medium text-gray-700 mb-1">
                Release Date<span className="text-red-500">*</span>
              </label>
              <Input
                id="release_date"
                name="release_date"
                type="date"
                value={formData.release_date || ''}
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
            
            {/* Add duration field */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration || ''}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || null})}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate('/admin/movies')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Movie"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditMovie;
