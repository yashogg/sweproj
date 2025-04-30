
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Clock } from 'lucide-react';

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

interface MovieTableProps {
  movies: Movie[];
  onEditShowtimes: (movie: Movie) => void;
  onDeleteConfirm: (movie: Movie) => void;
}

const MovieTable = ({ 
  movies, 
  onEditShowtimes, 
  onDeleteConfirm 
}: MovieTableProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'now playing':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'finished':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatShowtimes = (showtimes: Showtime[]) => {
    if (showtimes.length === 0) return 'No showtimes';
    
    const times = showtimes.map(st => st.time);
    return times.join(', ');
  };

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full border-collapse">
        <thead className="border-b">
          <tr>
            <th className="py-3 px-4 text-left font-medium">Movie Title</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Release Date</th>
            <th className="py-3 px-4 text-left font-medium">Showtime</th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            // Get first showtime's date for display
            const releaseDate = movie.showtimes.length > 0 ? movie.showtimes[0].date : 'N/A';
            
            return (
              <tr key={movie.id} className="border-b">
                <td className="py-3 px-4 font-medium">{movie.title}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(movie.status)}`}>
                    {movie.status}
                  </span>
                </td>
                <td className="py-3 px-4">{releaseDate}</td>
                <td className="py-3 px-4">{formatShowtimes(movie.showtimes)}</td>
                <td className="py-3 px-4">
                  <button 
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:underline mr-2"
                    onClick={() => onDeleteConfirm(movie)}
                  >
                    Delete
                  </button>
                  <button 
                    className="text-gray-600 hover:underline"
                    onClick={() => navigate(`/admin/movies/${movie.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
