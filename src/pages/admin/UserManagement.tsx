
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">User List Table</h2>
        
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full border-collapse">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 text-left font-medium">Email Address</th>
                <th className="py-3 px-4 text-left font-medium">Date Joined</th>
                <th className="py-3 px-4 text-left font-medium">Total Tickets Bought</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.dateJoined}</td>
                  <td className="py-3 px-4">{user.totalTicketsBought}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:underline mr-3">View</button>
                    <span className="text-gray-400">/ </span>
                    <button className="text-red-600 hover:underline ml-1">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
