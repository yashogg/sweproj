
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: number;
  title: string;
  imagePath?: string;
  rating?: number;
}

const MovieCard = ({ id, title, imagePath, rating }: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="relative overflow-hidden rounded-md bg-movie-light aspect-[3/4]">
        {imagePath ? (
          <img 
            src={imagePath} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-movie-light flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-movie-accent rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play className="w-6 h-6 text-black" />
          </div>
        </div>
        
        {rating && (
          <div className="absolute top-2 right-2 bg-movie-accent text-black text-xs font-bold px-2 py-1 rounded">
            {rating}/10
          </div>
        )}
      </div>
      
      <h3 className="mt-2 font-medium text-sm line-clamp-2">{title}</h3>
    </Link>
  );
};

export default MovieCard;
