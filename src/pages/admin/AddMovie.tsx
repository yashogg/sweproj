import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { addMovie } from '@/services/movie-service';
import { v4 as uuidv4 } from 'uuid';

const AddMovie = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    cast: '',
    poster: null as File | null,
    status: '',
    releaseDate: '',
    showtime: '',
    rating: 5.0,
    duration: 120 // Added default duration to match the required type
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
    
    setFormData({ ...formData, poster: file });
  };
  
  const uploadPoster = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('movie-posters')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error('Error uploading poster:', uploadError);
        toast({
          title: "Upload Failed",
          description: "Could not upload movie poster",
          variant: "destructive"
        });
        return null;
      }
      
      // Get the public URL for the uploaded image
      const { data } = supabase.storage
        .from('movie-posters')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error in upload process:', error);
      return null;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate inputs
    if (!formData.title || !formData.genre || !formData.description || !formData.status) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.poster) {
      toast({
        title: "Error",
        description: "Please upload a movie poster.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Additional validation for release date
    if (!formData.releaseDate) {
      toast({
        title: "Error",
        description: "Please select a release date.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    const releaseDate = new Date(formData.releaseDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (formData.status === 'nowPlaying' && releaseDate > today) {
      toast({
        title: "Invalid Release Date",
        description: "Currently showing movies must have a release date in the present or past.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (formData.status === 'upcoming' && releaseDate <= today) {
      toast({
        title: "Invalid Release Date",
        description: "Upcoming movies must have a future release date.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // 1. Upload poster image to Supabase Storage
      let imageUrl = null;
      if (formData.poster) {
        imageUrl = await uploadPoster(formData.poster);
        if (!imageUrl) {
          toast({
            title: "Error",
            description: "Failed to upload movie poster",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // 2. Map form status to database status format
      const statusMap: Record<string, 'Now Playing' | 'Upcoming' | 'Finished'> = {
        'nowPlaying': 'Now Playing',
        'upcoming': 'Upcoming',
        'finished': 'Finished'
      };
      
      // 3. Save movie data to Supabase
      const movieData = {
        title: formData.title,
        genre: formData.genre,
        description: formData.description,
        cast_members: formData.cast || null,
        image_path: imageUrl,
        status: statusMap[formData.status] as 'Now Playing' | 'Upcoming' | 'Finished',
        release_date: formData.releaseDate,
        rating: parseFloat(formData.rating.toString()),
        duration: formData.duration // Added duration field
      };
      
      const newMovie = await addMovie(movieData);
      
      toast({
        title: "Success",
        description: "Movie added successfully."
      });
      
      // Navigate back to movie management
      navigate('/admin/movies');
    } catch (error) {
      console.error('Error saving movie:', error);
      toast({
        title: "Error",
        description: "Failed to add movie. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AdminLayout title="Add New Movie">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Add New Movie</h2>
        
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
                Poster Upload<span className="text-red-500">*</span>
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
                    required
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
            
            <div className="md:col-span-2">
              <label htmlFor="showtime" className="block text-sm font-medium text-gray-700 mb-1">
                Initial Showtime (Optional)
              </label>
              <Input
                id="showtime"
                name="showtime"
                value={formData.showtime}
                onChange={handleChange}
                className="w-full"
                placeholder="e.g., 10:00 AM, 2:00 PM, 7:30 PM"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can add more showtimes after creating the movie
              </p>
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
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
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
              {isSubmitting ? "Saving..." : "Save Movie"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddMovie;
