
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-movie-dark py-3 px-5 flex items-center justify-between border-b border-movie-light">
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-lg font-bold">MovieApp</Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-movie-accent transition-colors">Home</Link>
          <Link to="/movies" className="hover:text-movie-accent transition-colors">Movies</Link>
          <Link to="/tv" className="hover:text-movie-accent transition-colors">TV Series</Link>
          <div className="relative flex items-center">
            <span className="hover:text-movie-accent transition-colors cursor-pointer">Genres</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="accent-btn">NEW</button>
        <Search className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <Link to="/profile" className="w-8 h-8 rounded-full bg-movie-light flex items-center justify-center">
          <span className="text-xs">U</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
