
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { importMovieData } from "./utils/data-migration";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import MoviesNowPlaying from "./pages/MoviesNowPlaying";
import MoviesUpcoming from "./pages/MoviesUpcoming";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import TicketConfirmation from "./pages/TicketConfirmation";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import MovieManagement from "./pages/admin/MovieManagement";
import UserManagement from "./pages/admin/UserManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import AddMovie from "./pages/admin/AddMovie";
import EditMovie from "./pages/admin/EditMovie";
import NotFound from "./pages/NotFound";

// Auth provider
import { AuthProvider } from "./context/AuthContext";

// Protected route components
interface ProtectedRouteProps {
  element: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ element, requireAuth = false, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  
  // If we're still loading the auth state, show nothing (could add a loading spinner)
  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }
  
  // Check if user is authenticated when required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user is admin when required
  if (requireAdmin && (!isAuthenticated || !isAdmin)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If user is already authenticated, redirect from login/register pages to home
  if (!requireAuth && isAuthenticated && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

// Data migration component
const DataMigration = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Run data migration on app startup
    importMovieData().catch(console.error);
  }, []);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DataMigration>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/movies/now-playing" element={<MoviesNowPlaying />} />
              <Route path="/movies/upcoming" element={<MoviesUpcoming />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
              <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
              
              {/* Protected User Routes */}
              <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} requireAuth={true} />} />
              <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} requireAuth={true} />} />
              <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} requireAuth={true} />} />
              <Route path="/ticket/:id" element={<ProtectedRoute element={<TicketConfirmation />} requireAuth={true} />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<ProtectedRoute element={<AdminLogin />} />} />
              <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requireAdmin={true} />} />
              <Route path="/admin/movies" element={<ProtectedRoute element={<MovieManagement />} requireAdmin={true} />} />
              <Route path="/admin/movies/add" element={<ProtectedRoute element={<AddMovie />} requireAdmin={true} />} />
              <Route path="/admin/movies/edit/:id" element={<ProtectedRoute element={<EditMovie />} requireAdmin={true} />} />
              <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} requireAdmin={true} />} />
              <Route path="/admin/settings" element={<ProtectedRoute element={<AdminSettings />} requireAdmin={true} />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DataMigration>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
