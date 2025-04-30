
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-movie-dark text-white">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-5">
          <h1 className="text-6xl font-bold mb-4 text-movie-accent">404</h1>
          <p className="text-2xl mb-8">Oops! We can't find that page</p>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/" className="inline-flex items-center bg-movie-accent text-black px-6 py-3 rounded font-bold hover:brightness-110 transition-all">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
