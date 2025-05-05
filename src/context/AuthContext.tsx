
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getLocalData, setLocalData } from '../services/local-storage-service';
import { User } from '../services/types';

interface Profile {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  updateProfile: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setProfile({
          name: parsedUser.name,
          email: parsedUser.email,
          phone: parsedUser.phone,
          address: parsedUser.address
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const users = getLocalData<User[]>('users', []);
      const user = users.find(u => u.email === email);
      
      // In a real app, we would check password hash
      // For now, we'll just check if the user exists
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      setUser(user);
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
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
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
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
      setProfile({
        name: newUser.name,
        email: newUser.email
      });
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: 'Registration Successful',
        description: 'Welcome to MovieApp! Your account has been created.',
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
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to update your profile');
      }
      
      setIsLoading(true);
      
      // Update user in localStorage
      const users = getLocalData<User[]>('users', []);
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex >= 0) {
        const updatedUser = {
          ...users[userIndex],
          ...updates
        };
        
        users[userIndex] = updatedUser;
        setLocalData('users', users);
        
        // Update current user
        setUser(updatedUser);
        setProfile({
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address
        });
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been successfully updated.',
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred updating your profile';
      toast({
        title: 'Update Failed',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setProfile(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const value = {
    user,
    profile,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin,
    isLoading,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
