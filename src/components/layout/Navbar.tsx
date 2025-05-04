
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
  const { isAuthenticated, user, profile, isAdmin, logout } = useAuth();
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
    <nav className="bg-ticketeer-purple-darker border-b border-ticketeer-purple-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Ticketeer</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/movies/now-playing" className="px-3 py-2 text-white hover:text-ticketeer-yellow">
              Now Playing
            </Link>
            <Link to="/movies/upcoming" className="px-3 py-2 text-white hover:text-ticketeer-yellow">
              Upcoming
            </Link>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative mx-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-ticketeer-purple-dark bg-ticketeer-purple-dark text-white focus:outline-none focus:ring-2 focus:ring-ticketeer-yellow focus:border-transparent"
              />
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full text-white hover:text-ticketeer-yellow">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-ticketeer-purple-dark text-white" align="end">
                  <DropdownMenuLabel className="text-ticketeer-yellow">
                    {profile?.name || user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-ticketeer-purple opacity-30" />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-ticketeer-purple hover:text-white">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')} className="hover:bg-ticketeer-purple hover:text-white">
                    My Tickets
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator className="bg-ticketeer-purple opacity-30" />
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="hover:bg-ticketeer-purple hover:text-white">
                        Admin Dashboard
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-ticketeer-purple opacity-30" />
                  <DropdownMenuItem onClick={logout} className="hover:bg-ticketeer-purple hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" className="text-ticketeer-yellow border-ticketeer-yellow hover:bg-ticketeer-purple" onClick={() => navigate('/login')}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <Button className="bg-ticketeer-yellow text-black hover:bg-yellow-400" onClick={() => navigate('/register')}>
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple-dark focus:outline-none"
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
        <div className="md:hidden bg-ticketeer-purple-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <form onSubmit={handleSearch} className="p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-ticketeer-purple bg-ticketeer-purple-darker text-white focus:outline-none focus:ring-2 focus:ring-ticketeer-yellow focus:border-transparent"
                />
                <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
            
            <Link to="/movies/now-playing" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
              <Film className="inline-block mr-2 h-5 w-5" /> Now Playing
            </Link>
            <Link to="/movies/upcoming" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
              <Film className="inline-block mr-2 h-5 w-5" /> Upcoming
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
                  <User className="inline-block mr-2 h-5 w-5" /> Profile
                </Link>
                <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
                  <Ticket className="inline-block mr-2 h-5 w-5" /> My Tickets
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple"
                >
                  <LogOut className="inline-block mr-2 h-5 w-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
                  <LogIn className="inline-block mr-2 h-5 w-5" /> Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-ticketeer-yellow hover:bg-ticketeer-purple">
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
