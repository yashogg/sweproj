
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    confirmPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would update the user profile
    toast({
      title: "Success",
      description: "Admin profile updated successfully."
    });
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    if (!formData.password) {
      toast({
        title: "Error",
        description: "Password is required.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would update the password
    toast({
      title: "Success",
      description: "Password updated successfully."
    });
    
    // Reset password fields
    setFormData({
      ...formData,
      password: '',
      confirmPassword: ''
    });
  };
  
  return (
    <AdminLayout title="Admin Settings">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Edit Admin Profile</h2>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Update Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Update Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Change Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="pt-4">
              <Button onClick={handleProfileUpdate}>
                Update Profile
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Admin</h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Name</TableHead>
                <TableHead className="w-[35%]">Email</TableHead>
                <TableHead className="w-[15%]">Role</TableHead>
                <TableHead className="w-[25%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit Role
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
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
