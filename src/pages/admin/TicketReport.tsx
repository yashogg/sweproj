
import AdminLayout from '@/components/layout/AdminLayout';

// Sample ticket data
const ticketData = [
  { 
    id: 1, 
    movieTitle: "Spider-Man", 
    date: "04/01/2025", 
    showtime: "2:00 PM", 
    totalSales: 48, 
    totalRevenue: 576 
  },
  { 
    id: 2, 
    movieTitle: "The Batman", 
    date: "04/03/2025", 
    showtime: "7:30 PM", 
    totalSales: 62, 
    totalRevenue: 744 
  },
  { 
    id: 3, 
    movieTitle: "Doctor Strange", 
    date: "03/25/2025", 
    showtime: "5:45 PM", 
    totalSales: 37, 
    totalRevenue: 444 
  },
  { 
    id: 4, 
    movieTitle: "Black Panther", 
    date: "03/28/2025", 
    showtime: "3:15 PM", 
    totalSales: 51, 
    totalRevenue: 612 
  },
  { 
    id: 5, 
    movieTitle: "Thor", 
    date: "04/05/2025", 
    showtime: "8:00 PM", 
    totalSales: 43, 
    totalRevenue: 516 
  },
];

const TicketReport = () => {
  return (
    <AdminLayout title="Ticket Sales Report">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Tickets Sales Table</h2>
        
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border-collapse">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Movie Title</th>
                <th className="py-3 px-4 text-left font-medium">Date</th>
                <th className="py-3 px-4 text-left font-medium">Showtime</th>
                <th className="py-3 px-4 text-left font-medium">Total Sales</th>
                <th className="py-3 px-4 text-left font-medium">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((ticket) => (
                <tr key={ticket.id} className="border-b">
                  <td className="py-3 px-4">{ticket.movieTitle}</td>
                  <td className="py-3 px-4">{ticket.date}</td>
                  <td className="py-3 px-4">{ticket.showtime}</td>
                  <td className="py-3 px-4">{ticket.totalSales}</td>
                  <td className="py-3 px-4">${ticket.totalRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="py-4 px-4 text-right">
                  <div>
                    <div className="font-semibold">Total: ${ticketData.reduce((acc, ticket) => acc + ticket.totalRevenue, 0).toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{ticketData.reduce((acc, ticket) => acc + ticket.totalSales, 0)} tickets sold</div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TicketReport;
