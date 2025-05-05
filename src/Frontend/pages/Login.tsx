
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fill in demo credentials
  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@ticketeer.com',
      password: 'admin'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      // Redirect will be handled by the isAuthenticated check on next render
    } catch (error: any) {
      // Error is already handled in the login function
      console.error('Login submission error:', error);
    }
  };

  return (
    <Layout title="Login">
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Login to Ticketeer</h1>
            <p className="mt-2 text-gray-300">
              Sign in to book tickets and manage your account.
            </p>
          </div>
          
          <div className="mt-8 bg-ticketeer-purple-dark p-8 shadow-md rounded-lg">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-ticketeer-purple-darker text-white border-ticketeer-purple"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
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
                  placeholder="••••••••"
                  className="bg-ticketeer-purple-darker text-white border-ticketeer-purple"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-ticketeer-yellow hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{" "}
                <Link to="/register" className="text-ticketeer-yellow font-medium hover:underline">
                  Register here
                </Link>
              </p>
            </div>

            {/* Admin login hint */}
            <div className="mt-8 pt-4 border-t border-gray-700 text-xs text-gray-400 text-center">
              <Button 
                type="button" 
                variant="link" 
                className="text-ticketeer-yellow text-sm"
                onClick={fillDemoCredentials}
              >
                Fill Demo Credentials
              </Button>
              <p>Email: admin@ticketeer.com</p>
              <p>Password: admin</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
