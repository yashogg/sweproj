
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, MapPin, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface TicketOrder {
  id: string;
  movieTitle: string;
  theater: string;
  screen: string;
  date: string;
  time: string;
  seats: string[];
  amount: string;
  purchaseDate: string;
}

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<TicketOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load order history from localStorage
      const orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${user.id}`) || '[]');
      setOrders(orderHistory);
      setIsLoading(false);
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout title="Order History" requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Ticket Orders</h1>
          
          {isLoading ? (
            <p className="text-center py-10">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h2 className="text-xl font-bold mb-4">No Tickets Found</h2>
              <p className="text-gray-600 mb-6">
                You haven't purchased any tickets yet. Explore our movies and book your first ticket!
              </p>
              <Button 
                onClick={() => navigate('/movies/now-playing')}
                className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark"
              >
                Browse Movies
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders
                .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
                .map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-ticketeer-purple-dark p-4 flex justify-between items-center">
                      <div className="text-white">
                        <span className="font-medium">Order ID: {order.id}</span>
                        <p className="text-sm opacity-80">Purchased on {formatDate(order.purchaseDate)}</p>
                      </div>
                      <Link to={`/ticket/${order.id}`}>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Ticket
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 flex-shrink-0">
                        <div className="bg-gray-200 rounded-md h-24 md:h-32 flex items-center justify-center text-center p-2">
                          <div>
                            <p className="font-bold text-xl">{formatShortDate(order.date)}</p>
                            <p className="text-sm">{order.time}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h2 className="text-xl font-bold mb-2">{order.movieTitle}</h2>
                        
                        <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                              <span>{order.theater}, {order.screen}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                              <span>{formatDate(order.date)}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                              <Clock className="w-4 h-4 mr-1 text-gray-500" />
                              <span>{order.time}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm mb-1">
                              <span className="text-gray-500">Seats:</span> <span className="font-medium">{order.seats.join(', ')}</span>
                            </div>
                            <div className="font-bold text-lg">
                              ${order.amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          
          <Separator className="my-8" />
          
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => navigate('/profile')}>Back to Profile</Button>
            <Link to="/movies/now-playing">
              <Button className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                Browse Movies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
