
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

// Sample admin data
const adminUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@email.com",
    role: "Admin"
  }
];

const AdminSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleProfileUpdate = () => {
    toast({
      title: "Success",
      description: "Admin profile updated successfully."
    });
  };
  
  return (
    <AdminLayout title="Admin Settings">
      <div className="space-y-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Admin Profile</h2>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <Input
                id="name"
                name="name"
                placeholder="Update Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-gray-800"
              />
            </div>
            
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Update Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-gray-800"
              />
            </div>
            
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Change Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-gray-800"
              />
            </div>
            
            <div className="pt-4">
              <Button onClick={handleProfileUpdate}>
                Update Profile
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Admin</h2>
          
          <div className="overflow-x-auto bg-white">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-700">Role</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((admin) => (
                  <tr key={admin.id} className="border-b">
                    <td className="py-3 px-4 text-gray-800">{admin.name}</td>
                    <td className="py-3 px-4 text-gray-800">{admin.email}</td>
                    <td className="py-3 px-4 text-gray-800">{admin.role}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:underline mr-1">Edit Role</button>
                      <span className="text-gray-400">/ </span>
                      <button className="text-red-600 hover:underline ml-1">Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
