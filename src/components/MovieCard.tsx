
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  title: string;
  imagePath: string;
  rating?: number;
  status?: 'Now Playing' | 'Upcoming' | 'Finished';
}

const MovieCard = ({ id, title, imagePath, rating, status }: MovieCardProps) => {
  return (
    <Link to={`/movies/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:-translate-y-1">
        <div className="aspect-[2/3] relative">
          <img
            src={imagePath || 'https://via.placeholder.com/300x450'}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Status badge */}
          {status && (
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                status === 'Now Playing' 
                  ? 'bg-green-500 text-white' 
                  : status === 'Upcoming' 
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white'
              }`}>
                {status}
              </span>
            </div>
          )}
          
          {/* Rating badge */}
          {rating && rating > 0 && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{rating}</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-white">
          <h3 className="font-medium text-gray-900 truncate">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
