
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  title?: string;
}

const Layout = ({ children, requireAuth = false, requireAdmin = false, title }: LayoutProps) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Check if user needs to be authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Check if user needs to be an admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Update document title if provided
  if (title) {
    document.title = `${title} | Ticketeer`;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-ticketeer-purple-darker font-montserrat">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
