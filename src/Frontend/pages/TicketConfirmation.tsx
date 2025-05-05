
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Home, Ticket, Calendar, Clock, MapPin, User } from 'lucide-react';

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
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve ticket details from sessionStorage
    const ticketDetailsStr = sessionStorage.getItem('ticketDetails');
    
    if (ticketDetailsStr) {
      try {
        const details = JSON.parse(ticketDetailsStr);
        setTicketDetails(details);
      } catch (error) {
        console.error('Error parsing ticket details:', error);
        toast({
          title: "Error",
          description: "Unable to load ticket details",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Ticket Not Found",
        description: "We couldn't find your ticket details",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  }, [id, toast]);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your ticket is being downloaded"
    });
    
    // In a real app, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your ticket has been downloaded"
      });
    }, 2000);
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Your ticket has been sent to your email"
    });
  };

  if (loading) {
    return (
      <Layout title="Loading Ticket...">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ticketeer-purple"></div>
        </div>
      </Layout>
    );
  }

  if (!ticketDetails) {
    return (
      <Layout title="Ticket Not Found">
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-center px-4">
            <Ticket className="h-16 w-16 text-ticketeer-yellow mx-auto mb-4 opacity-70" />
            <h2 className="text-2xl font-bold text-white mb-4">Ticket Not Found</h2>
            <p className="text-gray-300 mb-8 max-w-md">
              We couldn't find the ticket you're looking for. It may have expired or been removed.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/orders" className="bg-ticketeer-purple-dark hover:bg-ticketeer-purple text-white px-6 py-3 rounded-md font-medium">
                View All Tickets
              </Link>
              <Link to="/" className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark text-white px-6 py-3 rounded-md font-medium">
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Ticket Confirmation">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-b from-green-500 to-green-700 text-white py-3 px-6 rounded-full mb-6">
            <div className="flex items-center">
              <Ticket className="h-5 w-5 mr-2" />
              <span className="text-lg font-semibold">Purchase Successful</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Your Ticket is Confirmed</h1>
          <p className="text-gray-300 mb-8 text-center max-w-md">
            Your purchase has been completed successfully. Your tickets are ready below.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-ticketeer-purple-dark rounded-lg overflow-hidden shadow-xl">
          {/* Ticket Header */}
          <div className="bg-ticketeer-purple px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">{ticketDetails.movieTitle}</h2>
                <p className="text-gray-200">{ticketDetails.theater} • {ticketDetails.screen}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-200">Ticket #</p>
                <p className="font-mono font-medium text-white">{ticketDetails.id.substr(0, 8).toUpperCase()}</p>
              </div>
            </div>
          </div>
          
          {/* Divider with perforation */}
          <div className="relative">
            <div className="absolute left-0 right-0 h-4 flex items-center justify-between px-2">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-900 opacity-70"></div>
              ))}
            </div>
          </div>
          
          {/* Ticket Body */}
          <div className="p-6 grid md:grid-cols-3 gap-6">
            {/* Left Column - Movie & Time */}
            <div className="space-y-4 col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" /> Date
                  </p>
                  <p className="text-white font-medium">
                    {format(parseISO(ticketDetails.date), 'EEEE, MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" /> Time
                  </p>
                  <p className="text-white font-medium">{ticketDetails.time}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" /> Location
                </p>
                <p className="text-white font-medium">{ticketDetails.theater}</p>
              </div>
              
              <div>
                <p className="text-gray-400 flex items-center text-sm">
                  <User className="h-4 w-4 mr-1" /> Seats
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {ticketDetails.seats.map((seat, index) => (
                    <span key={index} className="bg-ticketeer-purple-darker text-white px-3 py-1 rounded-md text-sm font-medium">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Barcode */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                {/* Simple barcode representation */}
                <div className="h-24 w-48 flex items-end justify-center">
                  {[...ticketDetails.barcode].map((char, i) => (
                    <div 
                      key={i} 
                      className="w-1 mx-0.5 bg-black" 
                      style={{ 
                        height: `${(char.charCodeAt(0) % 10 + 5) * 10}%`
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-center text-xs font-mono text-black mt-2">
                  {ticketDetails.barcode}
                </p>
              </div>
              <p className="text-gray-400 text-xs mt-2 text-center">
                Present this barcode at the theater to collect your tickets
              </p>
            </div>
          </div>
          
          <Separator className="mx-6" />
          
          {/* Ticket Footer */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">Purchase Date</p>
              <p className="text-white">
                {format(parseISO(ticketDetails.purchaseDate), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Amount</p>
              <p className="text-white font-bold">${ticketDetails.amount}</p>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={handleDownload} className="bg-ticketeer-purple text-white">
            <Download className="h-4 w-4 mr-2" />
            Download Ticket
          </Button>
          <Button onClick={handleSendEmail} variant="outline" className="text-white border-white">
            Email Ticket
          </Button>
          <Link to="/">
            <Button variant="outline" className="text-white border-white">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default TicketConfirmation;
