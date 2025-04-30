
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TicketIcon, Banknote, Users, Calendar, ArrowUpRight, ArrowDownRight, Film } from 'lucide-react';

// Sample data for charts
const salesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1900 },
  { name: 'Wed', sales: 2100 },
  { name: 'Thu', sales: 2400 },
  { name: 'Fri', sales: 2800 },
  { name: 'Sat', sales: 3500 },
  { name: 'Sun', sales: 3000 },
];

const theaterData = [
  { name: 'Lubbock', value: 35 },
  { name: 'Amarillo', value: 25 },
  { name: 'Levelland', value: 10 },
  { name: 'Plainview', value: 15 },
  { name: 'Snyder', value: 8 },
  { name: 'Abilene', value: 7 },
];

const movieData = [
  { name: 'Spider-Man', tickets: 420, revenue: 5250 },
  { name: 'The Batman', tickets: 380, revenue: 4750 },
  { name: 'Dr Strange', tickets: 350, revenue: 4375 },
  { name: 'Black Panther', tickets: 310, revenue: 3875 },
  { name: 'Thor', tickets: 290, revenue: 3625 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#D6BCFA', '#6b46c1', '#9f7aea', '#b794f4'];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Stats for the summary cards
  const stats = {
    ticketsSold: 1750,
    ticketsChange: 12.5,
    revenue: 21875,
    revenueChange: 15.2,
    customers: 850,
    customersChange: 8.7,
    upcomingShows: 24,
    upcomingShowsChange: -5.2,
  };

  return (
    <Layout title="Admin Dashboard" requireAuth={true} requireAdmin={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Overview</h2>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Tickets Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">{stats.ticketsSold}</div>
                  <div className={`flex items-center text-sm ${
                    stats.ticketsChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.ticketsChange >= 0 ? 
                      <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    }
                    {Math.abs(stats.ticketsChange)}%
                  </div>
                </div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <TicketIcon className="w-6 h-6 text-ticketeer-purple" />
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
                <div>
                  <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
                  <div className={`flex items-center text-sm ${
                    stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.revenueChange >= 0 ? 
                      <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    }
                    {Math.abs(stats.revenueChange)}%
                  </div>
                </div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <Banknote className="w-6 h-6 text-ticketeer-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">{stats.customers}</div>
                  <div className={`flex items-center text-sm ${
                    stats.customersChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.customersChange >= 0 ? 
                      <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    }
                    {Math.abs(stats.customersChange)}%
                  </div>
                </div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <Users className="w-6 h-6 text-ticketeer-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Upcoming Shows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">{stats.upcomingShows}</div>
                  <div className={`flex items-center text-sm ${
                    stats.upcomingShowsChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.upcomingShowsChange >= 0 ? 
                      <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    }
                    {Math.abs(stats.upcomingShowsChange)}%
                  </div>
                </div>
                <div className="bg-ticketeer-purple-soft p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-ticketeer-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Theater Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={theaterData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {theaterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Movies Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Film className="mr-2 h-5 w-5" />
              Top Performing Movies
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
                  {movieData.map((movie, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{movie.name}</td>
                      <td className="py-3 text-right">{movie.tickets}</td>
                      <td className="py-3 text-right">${movie.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
