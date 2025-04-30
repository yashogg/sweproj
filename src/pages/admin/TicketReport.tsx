
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Tickets Sales Table</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25%]">Movie Title</TableHead>
              <TableHead className="w-[15%]">Date</TableHead>
              <TableHead className="w-[15%]">Showtime</TableHead>
              <TableHead className="w-[15%]" style={{ textAlign: 'right' }}>Total Sales</TableHead>
              <TableHead className="w-[20%]" style={{ textAlign: 'right' }}>Total Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ticketData.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.movieTitle}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>{ticket.showtime}</TableCell>
                <TableCell style={{ textAlign: 'right' }}>{ticket.totalSales}</TableCell>
                <TableCell style={{ textAlign: 'right' }}>${ticket.totalRevenue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            <div className="flex justify-end pt-4">
              <div className="text-right">
                <div className="font-semibold">Total: ${ticketData.reduce((acc, ticket) => acc + ticket.totalRevenue, 0).toLocaleString()}</div>
                <div className="text-sm text-gray-500">{ticketData.reduce((acc, ticket) => acc + ticket.totalSales, 0)} tickets sold</div>
              </div>
            </div>
          </TableCaption>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default TicketReport;
