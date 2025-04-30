
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Download, Share2, ArrowLeft, ArrowRight } from 'lucide-react';

// Sample ticket data
const sampleTicket = {
  id: '123',
  movieTitle: 'Spider-Man: No Way Home',
  theater: 'Lubbock - North Ridge',
  screen: 'Screen 3',
  date: '2025-05-05',
  time: '19:30',
  seats: ['F7', 'F8'],
  amount: 26.99,
  barcode: 'T1CK33TR0CK5',
  purchaseDate: '2025-04-30',
  poster: 'https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man'
};

const TicketConfirmation = () => {
  const { id } = useParams<{id: string}>();
  const [ticket, setTicket] = useState(sampleTicket);
  
  // In a real app, you would fetch the ticket data
  useEffect(() => {
    // fetchTicket(id).then(data => setTicket(data));
    console.log(`Fetching ticket with ID: ${id}`);
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

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
                  src={ticket.poster} 
                  alt={ticket.movieTitle} 
                  className="w-full rounded-md shadow"
                />
                <h3 className="font-bold text-lg mt-4">{ticket.movieTitle}</h3>
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
                      <h4 className="font-semibold">Seats</h4>
                      <p className="text-2xl font-bold mt-1">{ticket.seats.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-semibold">Total Amount</h4>
                      <p className="text-2xl font-bold mt-1">${ticket.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket ID</span>
                      <span className="font-medium">{ticket.id}</span>
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
                    <h4 className="font-semibold mb-4">Present this barcode at the theater</h4>
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
                      <p className="mt-2 text-sm font-mono">{ticket.barcode}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
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
