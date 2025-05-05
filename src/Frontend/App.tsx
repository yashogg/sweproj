import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import Checkout from './pages/Checkout';
import MoviesNowPlaying from './pages/MoviesNowPlaying';
import MoviesUpcoming from './pages/MoviesUpcoming';
import TicketConfirmation from './pages/TicketConfirmation';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/movies/now-playing" element={<MoviesNowPlaying />} />
          <Route path="/movies/upcoming" element={<MoviesUpcoming />} />
          <Route path="/ticket/:id" element={<TicketConfirmation />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
