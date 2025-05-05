
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Profile } from '../services/types';
import { useToast } from '@/hooks/use-toast';
import { getLocalData, setLocalData } from '../services/local-storage-service';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: any | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, address: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check for existing user in localStorage on mount
  useEffect(() => {
    const checkLocalAuth = () => {
      const localSession = getLocalData('session', null);
      const localUser = getLocalData('user', null);
      const localProfile = getLocalData('profile', null);
      
      if (localSession && localUser) {
        setSession(localSession);
        setUser(localUser);
        setProfile(localProfile);
      }
      
      setIsLoading(false);
    };
    
    checkLocalAuth();
  }, []);
  
  // Login with email and password (simplified for localStorage)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, we would validate credentials against a backend
      // For this frontend-only app, we'll just check if the user exists in localStorage
      const users = getLocalData<User[]>('users', []);
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        // Auto-create the user if they don't exist (for demo purposes)
        const newUser = {
          id: generateId(),
          email,
          name: email.split('@')[0]
        };
        
        users.push(newUser);
        setLocalData('users', users);
        
        // Create a profile
        const newProfile = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: null,
          address: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const profiles = getLocalData<Profile[]>('profiles', []);
        profiles.push(newProfile);
        setLocalData('profiles', profiles);
        
        // Set user and profile
        setUser(newUser);
        setProfile(newProfile);
        
        // Create a fake session
        const fakeSession = {
          access_token: `fake_token_${Date.now()}`,
          expires_at: Date.now() + 86400000 // 24 hours
        };
        
        setSession(fakeSession);
        setLocalData('session', fakeSession);
        setLocalData('user', newUser);
        setLocalData('profile', newProfile);
        
        toast({
          title: "Account created",
          description: `Welcome, ${newUser.name}!`,
        });
      } else {
        // User exists, log them in
        setUser(foundUser);
        
        // Get the profile
        const profiles = getLocalData<Profile[]>('profiles', []);
        const foundProfile = profiles.find(p => p.id === foundUser.id);
        
        if (foundProfile) {
          setProfile(foundProfile);
          setLocalData('profile', foundProfile);
        }
        
        // Create a fake session
        const fakeSession = {
          access_token: `fake_token_${Date.now()}`,
          expires_at: Date.now() + 86400000 // 24 hours
        };
        
        setSession(fakeSession);
        setLocalData('session', fakeSession);
        setLocalData('user', foundUser);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name || foundUser.email}!`,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a simple ID for users
  const generateId = (): string => {
    return 'user_' + Math.random().toString(36).substring(2, 15);
  };

  // Register a new user
  const register = async (name: string, email: string, password: string, phone: string, address: string) => {
    setIsLoading(true);
    
    try {
      const users = getLocalData<User[]>('users', []);
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "A user with this email already exists",
          variant: "destructive",
        });
        throw new Error("User already exists");
      }
      
      // Create the new user
      const newUser = {
        id: generateId(),
        email,
        name
      };
      
      users.push(newUser);
      setLocalData('users', users);
      
      // Create a profile
      const newProfile = {
        id: newUser.id,
        name,
        email,
        phone,
        address,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const profiles = getLocalData<Profile[]>('profiles', []);
      profiles.push(newProfile);
      setLocalData('profiles', profiles);
      
      // Set user and profile
      setUser(newUser);
      setProfile(newProfile);
      
      // Create a fake session
      const fakeSession = {
        access_token: `fake_token_${Date.now()}`,
        expires_at: Date.now() + 86400000 // 24 hours
      };
      
      setSession(fakeSession);
      setLocalData('session', fakeSession);
      setLocalData('user', newUser);
      setLocalData('profile', newProfile);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Welcome to Ticketeer!",
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout the user
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Clear auth data from state
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Clear auth data from localStorage
      localStorage.removeItem('session');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      
      toast({
        title: "Logout successful",
        description: "You have been logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update the user's profile
  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) {
      toast({
        title: "Update failed",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const profiles = getLocalData<Profile[]>('profiles', []);
      const index = profiles.findIndex(p => p.id === user.id);
      
      if (index !== -1) {
        // Update the profile
        const updatedProfile = {
          ...profiles[index],
          ...data,
          updated_at: new Date().toISOString()
        };
        
        profiles[index] = updatedProfile;
        setLocalData('profiles', profiles);
        
        // Update state
        setProfile(updatedProfile);
        setLocalData('profile', updatedProfile);
        
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the current user is an admin
  const isAdmin = !!profile?.email && profile.email === 'admin@ticketeer.com';

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      isAuthenticated: !!user,
      isAdmin,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
