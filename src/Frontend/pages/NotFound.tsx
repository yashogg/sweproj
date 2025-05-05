
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout title="Page Not Found">
      <div className="flex-grow flex items-center justify-center min-h-[70vh]">
        <div className="text-center px-5">
          <h1 className="text-6xl font-bold mb-4 text-ticketeer-yellow">404</h1>
          <p className="text-2xl mb-8 text-white">Oops! We can't find that page</p>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/" className="inline-flex items-center bg-ticketeer-purple text-white px-6 py-3 rounded font-bold hover:brightness-110 transition-all">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
