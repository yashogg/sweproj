
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AddMovie = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    cast: '',
    poster: null,
    status: '',
    releaseDate: '',
    showtime: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    
    // In a real app, this would save the movie data
    toast({
      title: "Success",
      description: "Movie added successfully."
    });
    
    // Navigate back to movie management
    navigate('/admin/movies');
  };
  
  return (
    <AdminLayout title="Add New Movie">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Add New Movie</h2>
        
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
              <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">
                Poster Upload
              </label>
              <div className="flex items-center">
                <Input
                  id="poster"
                  name="poster"
                  type="file"
                  className="w-full"
                  accept="image/*"
                />
                <Button variant="outline" size="sm" type="button" className="ml-2">
                  Upload
                </Button>
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Select name="status">
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
              <label htmlFor="showtime" className="block text-sm font-medium text-gray-700 mb-1">
                Assign Showtime
              </label>
              <Input
                id="showtime"
                name="showtime"
                value={formData.showtime}
                onChange={handleChange}
                className="w-full"
                placeholder="e.g., 10:00 AM, 2:00 PM, 7:30 PM"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={() => navigate('/admin/movies')}>
              Cancel
            </Button>
            <Button type="submit">
              Save Movie
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddMovie;
