
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    // For demo purposes, only allow admin@ticketeer.com/admin
    if (formData.email !== 'admin@ticketeer.com' || formData.password !== 'admin') {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await login(formData.email, formData.password);
      
      toast({
        title: "Welcome Admin",
        description: "You have successfully logged in to the admin panel.",
      });
      
      navigate('/admin');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Admin Login">
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-ticketeer-purple-darker">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-gray-400">
              Sign in to access the administration panel
            </p>
          </div>
          
          <div className="mt-8 bg-ticketeer-purple-dark p-8 shadow-md rounded-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 bg-ticketeer-purple-darker text-white border-ticketeer-purple"
                  placeholder="admin@ticketeer.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 bg-ticketeer-purple-darker text-white border-ticketeer-purple"
                  placeholder="********"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-ticketeer-purple hover:bg-ticketeer-purple-dark"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" /> Admin Login
                  </span>
                )}
              </Button>
              
              <div className="text-center text-sm">
                <p className="text-gray-400 mt-1">
                  Demo credentials: <code>admin@ticketeer.com</code> / <code>admin</code>
                </p>
              </div>
            </form>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <Lock className="h-4 w-4 text-gray-400 mr-2" />
            <p className="text-sm text-gray-400">
              Secure access for administrative users only
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
