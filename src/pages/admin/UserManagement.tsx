
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Sample user data
const userData = [
  {
    id: 1,
    name: "John Smith",
    email: "john@email.com",
    dateJoined: "03/01/25",
    totalTicketsBought: 10
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    dateJoined: "03/05/25",
    totalTicketsBought: 6
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@email.com",
    dateJoined: "03/10/25",
    totalTicketsBought: 12
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@email.com",
    dateJoined: "03/15/25",
    totalTicketsBought: 4
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert@email.com",
    dateJoined: "03/20/25",
    totalTicketsBought: 8
  }
];

const UserManagement = () => {
  return (
    <AdminLayout title="User Management">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">User List Table</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Name</TableHead>
              <TableHead className="w-[25%]">Email Address</TableHead>
              <TableHead className="w-[15%]">Date Joined</TableHead>
              <TableHead className="w-[20%]">Total Tickets Bought</TableHead>
              <TableHead className="w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dateJoined}</TableCell>
                <TableCell>{user.totalTicketsBought}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    Deactivate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
