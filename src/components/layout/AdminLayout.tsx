import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Film, Settings, Search, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  showActions?: boolean;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
}

const AdminLayout = ({ 
  children, 
  title,
  showActions = false,
  onSearch,
  onAdd
}: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel."
    });
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/movies', label: 'Movie Management', icon: Film },
    { path: '/admin/settings', label: 'Admin Settings', icon: Settings }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-ticketeer-purple-darker">
        <div className="p-4">
          <Link to="/admin" className="flex flex-col items-center text-white">
            <h1 className="text-2xl font-bold">Ticketeer</h1>
            <p className="text-xs text-gray-400">movie booking</p>
          </Link>
          <div className="mt-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input 
                type="text" 
                placeholder="Search" 
                className="bg-ticketeer-purple-dark text-white text-sm border-none h-8 pr-8"
              />
              <Search className="absolute right-2 top-1.5 h-4 w-4 text-gray-400" />
            </form>
          </div>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm ${
                      isActive 
                        ? "bg-white text-ticketeer-purple-darker" 
                        : "text-gray-300 hover:bg-ticketeer-purple-dark"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center text-gray-300 hover:bg-ticketeer-purple-dark hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          
          {/* Header Actions */}
          {showActions && (
            <div className="flex justify-between mb-6">
              <div className="w-64">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-200 text-gray-800 border-none pl-10"
                  />
                  <button type="submit" className="absolute inset-y-0 left-0 px-3 flex items-center">
                    <Search className="h-4 w-4 text-gray-600" />
                  </button>
                </form>
              </div>
              
              {onAdd && (
                <Button 
                  onClick={onAdd}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              )}
            </div>
          )}
          
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-ticketeer-purple-darker py-4">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm">© 2025 Ticketeer Admin Panel. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
