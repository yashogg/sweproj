
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Search, 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  Film, 
  Ticket, 
  LogOut 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Ticket className="h-8 w-auto text-ticketeer-purple mr-2" />
              <span className="text-2xl font-bold text-ticketeer-purple-dark">Ticketeer</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/movies/now-playing" className="px-3 py-2 text-ticketeer-purple-darker hover:text-ticketeer-purple">
              Now Playing
            </Link>
            <Link to="/movies/upcoming" className="px-3 py-2 text-ticketeer-purple-darker hover:text-ticketeer-purple">
              Upcoming
            </Link>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative mx-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ticketeer-purple focus:border-transparent"
              />
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-ticketeer-purple-dark">
                    {user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    My Tickets
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        Admin Dashboard
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" className="text-ticketeer-purple border-ticketeer-purple" onClick={() => navigate('/login')}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <Button className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark" onClick={() => navigate('/register')}>
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <form onSubmit={handleSearch} className="p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ticketeer-purple focus:border-transparent"
                />
                <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            
            <Link to="/movies/now-playing" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
              <Film className="inline-block mr-2 h-5 w-5" /> Now Playing
            </Link>
            <Link to="/movies/upcoming" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
              <Film className="inline-block mr-2 h-5 w-5" /> Upcoming
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
                  <User className="inline-block mr-2 h-5 w-5" /> Profile
                </Link>
                <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
                  <Ticket className="inline-block mr-2 h-5 w-5" /> My Tickets
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50"
                >
                  <LogOut className="inline-block mr-2 h-5 w-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
                  <LogIn className="inline-block mr-2 h-5 w-5" /> Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-ticketeer-purple-dark hover:text-ticketeer-purple hover:bg-gray-50">
                  <UserPlus className="inline-block mr-2 h-5 w-5" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
