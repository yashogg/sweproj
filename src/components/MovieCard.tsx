
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
    <Link to={`/movies/${id}`} className="group">
      <div className="relative overflow-hidden rounded-md bg-ticketeer-purple-dark aspect-[3/4]">
        {imagePath ? (
          <img 
            src={imagePath} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-ticketeer-purple-dark flex items-center justify-center p-4">
            <h3 className="text-center font-medium text-white">{title}</h3>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-ticketeer-yellow rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play className="w-6 h-6 text-black" />
          </div>
        </div>
        
        {rating && (
          <div className="absolute top-2 right-2 bg-ticketeer-yellow text-black text-xs font-bold px-2 py-1 rounded">
            {rating}/10
          </div>
        )}
      </div>
      
      <h3 className="mt-2 font-medium text-sm line-clamp-2 text-white">{title}</h3>
    </Link>
  );
};

export default MovieCard;
