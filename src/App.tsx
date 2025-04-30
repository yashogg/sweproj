
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMovies from "./pages/admin/Movies";
import NotFound from "./pages/NotFound";

// Auth provider
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/movies/now-playing" element={<MoviesNowPlaying />} />
            <Route path="/movies/upcoming" element={<MoviesUpcoming />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected User Routes */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/ticket/:id" element={<TicketConfirmation />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
