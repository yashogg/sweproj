
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getOrderById } from '@/services/order-service';
import { getShowtimeById } from '@/services/showtime-service';
import { OrderWithDetails } from '@/services/types';

const TicketConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrderById(id);
        if (orderData) {
          // Fetch the showtime details including movie and theater
          if (orderData.showtime_id) {
            const showtimeData = await getShowtimeById(orderData.showtime_id);
            if (showtimeData) {
              setOrder({
                ...orderData,
                showtime: showtimeData
              });
            } else {
              setOrder(orderData);
            }
          } else {
            setOrder(orderData);
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout title="Ticket Not Found">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Ticket Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the ticket you're looking for.</p>
          <Link to="/" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Ticket Confirmation">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-600 text-white py-4 px-6">
            <h1 className="text-2xl font-bold">Ticket Confirmation</h1>
            <p>Order #{order.id.substring(0, 8)}</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {order.showtime?.movie?.title || 'Movie Title'}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{order.showtime?.date || 'Date'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium">{order.showtime?.time || 'Time'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Theater</p>
                  <p className="font-medium">{order.showtime?.theater?.name || 'Theater'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Seats</p>
                  <p className="font-medium">{order.seats} tickets</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="flex justify-between">
                <span>Status</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.payment_status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  order.payment_status === 'Failed' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.payment_status}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Total Amount</span>
                <span className="font-semibold">${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Please arrive 15 minutes before showtime. This ticket will be required for entry.
              </p>
              <Link to="/" className="inline-block px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketConfirmation;
