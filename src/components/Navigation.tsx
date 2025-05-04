
import { Bell, ChevronDown, Search, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const { isAuthenticated, isAdmin, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-movie-dark py-3 px-5 flex items-center justify-between border-b border-movie-light">
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-lg font-bold">MovieApp</Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-movie-accent transition-colors">Home</Link>
          <Link to="/movies/now-playing" className="hover:text-movie-accent transition-colors">Now Playing</Link>
          <Link to="/movies/upcoming" className="hover:text-movie-accent transition-colors">Coming Soon</Link>
          {isAdmin && (
            <Link to="/admin" className="text-yellow-400 hover:text-yellow-500 transition-colors">Admin</Link>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-movie-light text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-movie-accent"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
        </form>
        
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 rounded-full bg-movie-light flex items-center justify-center p-0">
                <span className="text-xs">{profile?.name?.[0] || 'U'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/orders')}>
                <Bell className="mr-2 h-4 w-4" />
                <span>My Tickets</span>
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <span className="text-yellow-500">Admin Dashboard</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/login')}
              className="text-sm"
            >
              Log In
            </Button>
            <Button 
              size="sm"
              onClick={() => navigate('/register')}
              className="text-sm"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
