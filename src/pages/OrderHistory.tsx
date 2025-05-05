
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { getUserOrders } from '@/services/order-service';
import { OrderWithDetails } from '@/services/types';
import { useAuth } from '@/context/AuthContext';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <Layout title="Order History" requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center my-12 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
            <p className="text-gray-600">You haven't made any purchases yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{order.movieTitle || 'Unknown Movie'}</h2>
                    <p className="text-gray-600">{new Date(order.orderDate || '').toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Total: ${order.totalPrice.toFixed(2)}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' : 
                      order.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <p><span className="font-medium">Tickets:</span> {order.seats}</p>
                  <p><span className="font-medium">Theater:</span> {order.theater}</p>
                  <p><span className="font-medium">Showtime:</span> {order.date} at {order.showtimeDetails?.time || '-'}</p>
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
