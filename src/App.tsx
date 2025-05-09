
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { initializeApp } from "./services/api.service";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import TicketConfirmation from "./pages/TicketConfirmation";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import MovieManagement from "./pages/admin/MovieManagement";
import AdminSettings from "./pages/admin/AdminSettings";

// Auth provider
import { AuthProvider } from "./context/AuthContext";

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ element, requireAuth = false, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  
  // If we're still loading the auth state, show loading
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  // Check if user is authenticated when required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user is admin when required
  if (requireAdmin && (!isAuthenticated || !isAdmin)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  // If user is already authenticated, redirect from login/register pages to home
  if (!requireAuth && isAuthenticated && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

// Data migration component
const DataInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize local data on app startup
    initializeApp();
  }, []);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <DataInitializer>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/now-playing" element={<Movies />} />
              <Route path="/movies/upcoming" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
              <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
              
              {/* Protected User Routes */}
              <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} requireAuth={true} />} />
              <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} requireAuth={true} />} />
              <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} requireAuth={true} />} />
              <Route path="/ticket/:id" element={<ProtectedRoute element={<TicketConfirmation />} requireAuth={true} />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requireAdmin={true} />} />
              <Route path="/admin/movies" element={<ProtectedRoute element={<MovieManagement />} requireAdmin={true} />} />
              <Route path="/admin/settings" element={<ProtectedRoute element={<AdminSettings />} requireAdmin={true} />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataInitializer>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
