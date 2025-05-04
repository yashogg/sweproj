
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import MovieCard from '@/components/MovieCard';

interface Movie {
  id: string; // Changed from number to string to match Supabase data
  title: string;
  imagePath?: string;
  rating?: number;
}

interface MovieSectionProps {
  title: string;
  icon: React.ReactNode;
  movies: Movie[];
  viewAllPath: string;
  bgClass?: string;
}

const MovieSection = ({ title, icon, movies, viewAllPath, bgClass = '' }: MovieSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <section className={`py-12 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-ticketeer-purple-dark flex items-center">
            {icon} {title}
          </h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate(viewAllPath)}
            className="text-ticketeer-purple hover:text-ticketeer-purple-dark"
          >
            View All <ChevronRight className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
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
    </section>
  );
};

export default MovieSection;
