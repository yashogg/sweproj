
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, address: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ticketeer_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo, we'll allow login with any credentials
    // In production, this would validate against a backend
    
    // Check if admin login (for demo purposes)
    if (email === 'admin@ticketeer.com' && password === 'admin') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@ticketeer.com',
        role: 'admin' as const
      };
      setUser(adminUser);
      localStorage.setItem('ticketeer_user', JSON.stringify(adminUser));
      return;
    }
    
    // Regular user login
    const user = {
      id: '2',
      name: email.split('@')[0],
      email,
      role: 'user' as const
    };
    
    setUser(user);
    localStorage.setItem('ticketeer_user', JSON.stringify(user));
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, phone: string, address: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In production this would send data to a backend
    const user = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user' as const
    };
    
    setUser(user);
    localStorage.setItem('ticketeer_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ticketeer_user');
  };

  // Mock profile update
  const updateProfile = async (data: Partial<User>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('ticketeer_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
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
