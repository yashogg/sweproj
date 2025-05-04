
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Download, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import { getOrderById } from '@/services/order-service';
import { OrderWithDetails } from '@/services/supabase-types';
import { useToast } from '@/hooks/use-toast';

interface TicketDetails {
  id: string;
  movieTitle: string;
  theater: string;
  screen: string;
  date: string;
  time: string;
  seats: string[];
  amount: string;
  barcode: string;
  purchaseDate: string;
  poster?: string;
}

const TicketConfirmation = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "Invalid ticket ID",
          variant: "destructive"
        });
        navigate('/orders');
        return;
      }

      // First try to get from session storage (for newly purchased tickets)
      const ticketDetailsStr = sessionStorage.getItem('ticketDetails');
      if (ticketDetailsStr) {
        try {
          const details = JSON.parse(ticketDetailsStr);
          if (details.id === id) {
            setTicket(details);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error parsing ticket details:", error);
        }
      }

      // If not in session storage, fetch from database
      try {
        const order = await getOrderById(id);
        if (!order) {
          toast({
            title: "Not Found",
            description: "Ticket not found",
            variant: "destructive"
          });
          navigate('/orders');
          return;
        }

        // Transform order into ticket details
        const movieTitle = order.showtimes?.movies?.title || "Unknown Movie";
        const theaterName = order.showtimes?.theaters?.name || "Unknown Theater";
        const screenName = `Screen ${Math.floor(Math.random() * 10) + 1}`;
        const showDate = order.showtimes?.date || new Date().toISOString().split('T')[0];
        const showTime = order.showtimes?.time || "00:00";
        
        // Generate placeholder seats (in a real app, these would be stored in the database)
        const seatsList = [...Array(order.seats)].map((_, i) => 
          String.fromCharCode(65 + Math.floor(i/10)) + (i%10 + 1)
        );

        const ticketData: TicketDetails = {
          id: order.id,
          movieTitle: movieTitle,
          theater: theaterName,
          screen: screenName,
          date: showDate,
          time: showTime,
          seats: seatsList,
          amount: order.total_amount.toString(),
          barcode: 'T' + order.id.substring(0, 6) + 'R' + Math.floor(1000 + Math.random() * 9000),
          purchaseDate: order.order_date,
          poster: order.showtimes?.movies?.image_path
        };

        setTicket(ticketData);
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast({
          title: "Error",
          description: "Failed to load ticket details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, navigate, toast]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Function to print the ticket
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Layout title="Loading Ticket" requireAuth={true}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ticketeer-purple mx-auto"></div>
            <p className="mt-4 text-white">Loading ticket details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout title="Ticket Not Found" requireAuth={true}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ticket Not Found</h2>
            <p className="text-gray-300 mb-6">
              The ticket you're looking for could not be found. It may have been deleted or you may have entered an incorrect URL.
            </p>
            <Button onClick={() => navigate('/orders')} className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
              View All Tickets
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Ticket Confirmation" requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
            <h1 className="text-2xl font-bold text-green-700 mb-2">Ticket Purchased Successfully!</h1>
            <p className="text-green-600">
              Your ticket has been booked and is ready to use.
            </p>
          </div>
          
          {/* E-Ticket */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-ticketeer-purple text-white">
              <h2 className="text-xl font-bold">Your E-Ticket</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Left Column - Movie Info */}
              <div className="md:col-span-1">
                <img 
                  src={ticket.poster || "https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=" + encodeURIComponent(ticket.movieTitle)} 
                  alt={ticket.movieTitle} 
                  className="w-full rounded-md shadow"
                />
                <h3 className="font-bold text-lg mt-4 text-gray-800">{ticket.movieTitle}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(ticket.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {ticket.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {ticket.theater}, {ticket.screen}
                </div>
              </div>
              
              {/* Right Column - Ticket Details */}
              <div className="md:col-span-2">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Seats</h4>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{ticket.seats.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-semibold text-gray-800">Total Amount</h4>
                      <p className="text-2xl font-bold mt-1 text-gray-800">${ticket.amount}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-gray-800">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket ID</span>
                      <span className="font-medium">{ticket.id.substring(0, 8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchase Date</span>
                      <span className="font-medium">{formatDate(ticket.purchaseDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Tickets</span>
                      <span className="font-medium">{ticket.seats.length}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {/* Barcode */}
                  <div className="mt-6 text-center">
                    <h4 className="font-semibold mb-4 text-gray-800">Present this barcode at the theater</h4>
                    <div className="bg-gray-100 p-4 rounded-lg mb-3">
                      {/* Barcode Image - In a real app, you would generate an actual barcode or QR code */}
                      <div className="bg-white py-6 px-4">
                        <div className="flex justify-between items-center">
                          <div className="h-16 w-2 bg-black"></div>
                          <div className="h-16 w-1 bg-black"></div>
                          <div className="h-16 w-3 bg-black"></div>
                          <div className="h-16 w-2 bg-black"></div>
                          <div className="h-16 w-1 bg-black"></div>
                          <div className="h-16 w-4 bg-black"></div>
                          <div className="h-16 w-1 bg-black"></div>
                          <div className="h-16 w-3 bg-black"></div>
                          <div className="h-16 w-2 bg-black"></div>
                          <div className="h-16 w-1 bg-black"></div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-mono text-gray-800">{ticket.barcode}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Download className="w-4 h-4 mr-2" />
                    Print Ticket
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                <p className="font-bold mb-2">Instructions:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Please arrive at least 15 minutes before the show time.</li>
                  <li>Show this ticket on your device or as a printout at the entrance.</li>
                  <li>This ticket cannot be exchanged or refunded.</li>
                </ol>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex justify-between mt-8">
            <Link to="/orders">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Tickets
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketConfirmation;
