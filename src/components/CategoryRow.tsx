
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

interface Movie {
  id: string; // Changed from number to string to match Supabase data
  title: string;
  imagePath?: string;
  rating?: number;
}

interface CategoryRowProps {
  title: string;
  movies: Movie[];
  viewAllLink: string;
}

const CategoryRow = ({ title, movies, viewAllLink }: CategoryRowProps) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link to={viewAllLink} className="flex items-center text-sm text-movie-accent hover:underline">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imagePath={movie.imagePath}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
