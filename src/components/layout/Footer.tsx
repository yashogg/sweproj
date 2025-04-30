
import { Link } from 'react-router-dom';
import { Ticket, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ticketeer-purple-darker border-t border-ticketeer-purple-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-ticketeer-yellow px-2 py-1 mr-2 text-xs font-bold uppercase text-black">
                Ticketeer
              </div>
              <span className="text-xl font-bold text-white">Ticketeer</span>
            </Link>
            <p className="text-gray-300 text-sm mt-2">
              Book movie tickets online with ease. Skip the lines and enjoy your favorite movies at our 6 theaters across Texas.
            </p>
          </div>
          
          {/* Theaters */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-ticketeer-yellow">Our Theaters</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Lubbock</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Amarillo</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Levelland</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Plainview</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Snyder</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Abilene</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-ticketeer-yellow">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/movies/now-playing" className="hover:text-ticketeer-yellow">
                  Now Playing
                </Link>
              </li>
              <li>
                <Link to="/movies/upcoming" className="hover:text-ticketeer-yellow">
                  Upcoming Movies
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-ticketeer-yellow">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-ticketeer-yellow">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-ticketeer-yellow">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>support@ticketeer.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>1-800-TICKETS</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-ticketeer-purple-dark flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Ticketeer. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-ticketeer-yellow">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-ticketeer-yellow">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
