
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { getOrdersByUserId } from '../services/order-service';
import { OrderWithDetails } from '../services/types';

// Date-fns
import { format, parseISO } from 'date-fns';

// Icons
import { Calendar, Clock, Film, MapPin, Ticket } from 'lucide-react';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        // Get all orders for the current user
        const userOrders = await getOrdersByUserId(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        toast({
          title: "Error",
          description: "Failed to load your order history.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadOrders();
  }, [user, navigate, toast]);
  
  return (
    <Layout title="Order History" requireAuth={true}>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">My Tickets</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ticketeer-purple"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 bg-ticketeer-purple-dark rounded-lg">
            <Ticket className="h-16 w-16 text-ticketeer-yellow mx-auto mb-4 opacity-70" />
            <h2 className="text-xl font-medium text-white">No tickets found</h2>
            <p className="text-gray-300 mt-2 mb-6">You haven't purchased any tickets yet.</p>
            <Link 
              to="/movies/now-playing" 
              className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark text-white px-6 py-3 rounded-md font-medium"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const showtime = order.showtime;
              const movie = showtime?.movie;
              
              return (
                <div key={order.id} className="bg-ticketeer-purple-dark rounded-lg overflow-hidden shadow-lg">
                  <div className="md:flex">
                    {/* Movie Poster (if available) */}
                    {movie?.image_path && (
                      <div className="md:w-1/4 h-full">
                        <img 
                          src={movie.image_path} 
                          alt={movie.title} 
                          className="w-full h-full object-cover object-center"
                          style={{ maxHeight: '250px' }}
                        />
                      </div>
                    )}
                    
                    {/* Order Details */}
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {movie?.title || "Unknown Movie"}
                          </h3>
                          
                          {showtime && (
                            <div className="mt-1 flex flex-wrap gap-y-1">
                              <div className="flex items-center text-gray-300 text-sm mr-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                {format(parseISO(showtime.date), 'MMMM dd, yyyy')}
                              </div>
                              <div className="flex items-center text-gray-300 text-sm mr-4">
                                <Clock className="h-4 w-4 mr-1" />
                                {showtime.time}
                              </div>
                              <div className="flex items-center text-gray-300 text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                {showtime.theater?.name || "Unknown Theater"}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <div className="bg-ticketeer-yellow text-black px-3 py-1 rounded-full text-xs font-bold">
                            {order.payment_status || "Pending"}
                          </div>
                          <p className="text-gray-300 text-sm mt-1">
                            {format(parseISO(order.order_date), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-700">
                        <div>
                          <div className="flex items-center mb-1">
                            <Ticket className="h-4 w-4 mr-2 text-gray-300" />
                            <span className="text-white font-medium">Tickets: {order.seats}</span>
                          </div>
                          <div className="text-lg font-bold text-white">
                            Total: ${order.total_amount.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0">
                          <Link 
                            to={`/ticket/${order.id}`}
                            className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark text-white px-4 py-2 rounded-md text-sm font-medium"
                          >
                            View Ticket
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
