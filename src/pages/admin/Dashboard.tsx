
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Banknote, Film } from 'lucide-react';

// Sample movie data for the currently playing movies
const currentMovies = [
  { id: 1, title: "Spider-Man", ticketsSold: 420, revenue: 5250 },
  { id: 2, title: "The Batman", ticketsSold: 380, revenue: 4750 },
  { id: 3, title: "Dr Strange", ticketsSold: 350, revenue: 4375 },
  { id: 4, title: "Black Panther", ticketsSold: 310, revenue: 3875 },
  { id: 5, title: "Thor", ticketsSold: 290, revenue: 3625 },
];

const AdminDashboard = () => {
  // Calculate totals for the summary cards
  const totalTickets = currentMovies.reduce((sum, movie) => sum + movie.ticketsSold, 0);
  const totalRevenue = currentMovies.reduce((sum, movie) => sum + movie.revenue, 0);
  
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6">Sales Report</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Tickets Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{totalTickets}</div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <Ticket className="w-6 h-6 text-ticketeer-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <Banknote className="w-6 h-6 text-ticketeer-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Playing Movies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{currentMovies.length}</div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <Film className="w-6 h-6 text-ticketeer-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Currently Playing Movies Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Film className="mr-2 h-5 w-5" />
              Currently Playing Movies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Movie</th>
                    <th className="py-3 text-right font-medium">Tickets Sold</th>
                    <th className="py-3 text-right font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMovies.map((movie) => (
                    <tr key={movie.id} className="border-b">
                      <td className="py-3">{movie.title}</td>
                      <td className="py-3 text-right">{movie.ticketsSold}</td>
                      <td className="py-3 text-right">${movie.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-3 font-medium">Total</td>
                    <td className="py-3 text-right font-medium">{totalTickets}</td>
                    <td className="py-3 text-right font-medium">${totalRevenue.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
