
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, Clock, MapPin, Download, QrCode } from 'lucide-react';

// Sample ticket data
const sampleTickets = [
  {
    id: '1001',
    movieTitle: 'Spider-Man: No Way Home',
    theater: 'Lubbock - North Ridge',
    date: '2025-05-05',
    time: '19:30',
    seats: ['F7', 'F8'],
    amount: 24.99,
    status: 'active',
    poster: 'https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Spider-Man'
  },
  {
    id: '1002',
    movieTitle: 'The Batman',
    theater: 'Amarillo - Westgate',
    date: '2025-05-02',
    time: '20:45',
    seats: ['D12', 'D13', 'D14'],
    amount: 36.50,
    status: 'active',
    poster: 'https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Batman'
  },
  {
    id: '1003',
    movieTitle: 'Top Gun: Maverick',
    theater: 'Lubbock - South Point',
    date: '2025-04-15',
    time: '18:15',
    seats: ['H5'],
    amount: 12.99,
    status: 'used',
    poster: 'https://via.placeholder.com/300x450/2D1B4E/FFFFFF?text=Top+Gun'
  }
];

const OrderHistory = () => {
  const [tickets, setTickets] = useState(sampleTickets);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const filteredTickets = activeFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === (activeFilter === 'active' ? 'active' : 'used'));

  return (
    <Layout title="Order History" requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
        
        <div className="mb-6">
          <div className="flex space-x-2">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'bg-ticketeer-purple hover:bg-ticketeer-purple-dark' : ''}
            >
              All Tickets
            </Button>
            <Button 
              variant={activeFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('active')}
              className={activeFilter === 'active' ? 'bg-ticketeer-purple hover:bg-ticketeer-purple-dark' : ''}
            >
              Active
            </Button>
            <Button 
              variant={activeFilter === 'used' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('used')}
              className={activeFilter === 'used' ? 'bg-ticketeer-purple hover:bg-ticketeer-purple-dark' : ''}
            >
              Used
            </Button>
          </div>
        </div>
        
        {filteredTickets.length === 0 ? (
          <div className="text-center py-16">
            <Ticket className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No tickets found</h2>
            <p className="text-gray-600 mb-6">
              {activeFilter === 'all' 
                ? "You haven't purchased any tickets yet." 
                : `You don't have any ${activeFilter} tickets.`}
            </p>
            <Link to="/movies/now-playing">
              <Button className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                Browse Movies
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 lg:w-1/6">
                    <img 
                      src={ticket.poster} 
                      alt={ticket.movieTitle} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{ticket.movieTitle}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(ticket.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {ticket.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {ticket.theater}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                          ${ticket.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'}`}
                        >
                          {ticket.status === 'active' ? 'Active' : 'Used'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm">
                        <span className="font-medium">Seats:</span> {ticket.seats.join(', ')}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Amount paid:</span> ${ticket.amount.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Link to={`/ticket/${ticket.id}`}>
                        <Button size="sm" className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                          <QrCode className="w-4 h-4 mr-2" />
                          View Ticket
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
