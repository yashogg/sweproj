
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getLocalData, setLocalData } from '../services/local-storage-service';

interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const users = getLocalData<User[]>('users', []);
      const user = users.find(u => u.email === email);
      
      // In a real app, we would check password hash
      // For now, we'll just check if the user exists
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      toast({
        title: 'Welcome back!',
        description: `You've successfully logged in as ${user.name || user.email}`,
      });
      
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during login';
      toast({
        title: 'Login Failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const users = getLocalData<User[]>('users', []);
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        isAdmin: false,
      };
      
      // Store user in localStorage
      users.push(newUser);
      setLocalData('users', users);
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: 'Registration Successful',
        description: 'Welcome to Ticketeer! Your account has been created.',
      });
      
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during registration';
      toast({
        title: 'Registration Failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
