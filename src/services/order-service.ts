
import { Order, OrderWithDetails, ShowtimeWithDetails } from './types';
import { getLocalData, setLocalData, generateId } from './local-storage-service';
import { getShowtimeById } from './showtime-service';

export async function getUserOrders(userId: string): Promise<OrderWithDetails[]> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    
    // Filter orders by user ID
    const userOrders = orders.filter(order => order.userId === userId);
    
    // Sort by order date, newest first
    const sortedOrders = [...userOrders].sort((a, b) => {
      if (a.orderDate && b.orderDate) {
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      }
      return 0;
    });
    
    // Enhance with showtime details
    const ordersWithDetails: OrderWithDetails[] = await Promise.all(
      sortedOrders.map(async (order) => {
        if (order.showtimeId) {
          const showtime = await getShowtimeById(order.showtimeId);
          return {
            ...order,
            showtimeDetails: showtime || undefined
          };
        }
        return order;
      })
    );
    
    return ordersWithDetails;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<OrderWithDetails | null> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    const order = orders.find(o => o.id === id);
    
    if (!order) {
      return null;
    }
    
    // Get showtime details
    if (order.showtimeId) {
      const showtime = await getShowtimeById(order.showtimeId);
      return {
        ...order,
        showtimeDetails: showtime || undefined
      };
    }
    
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(orderData: {
  userId: string;
  movieId: string;
  movieTitle: string;
  showtimeId: string;
  seats: number;
  theater: string;
  date: string;
  totalPrice: number;
}): Promise<OrderWithDetails> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    
    // Create new order
    const newOrder: Order = {
      id: generateId(),
      userId: orderData.userId,
      movieId: orderData.movieId,
      movieTitle: orderData.movieTitle,
      showtimeId: orderData.showtimeId,
      seats: orderData.seats,
      theater: orderData.theater,
      date: orderData.date,
      totalPrice: orderData.totalPrice,
      orderDate: new Date().toISOString(),
      paymentStatus: 'Completed'
    };
    
    // Add to localStorage
    orders.push(newOrder);
    setLocalData('orders', orders);
    
    // Update showtime available seats
    const showtimes = getLocalData('showtimes', []);
    const showtimeIndex = showtimes.findIndex(s => s.id === orderData.showtimeId);
    
    if (showtimeIndex !== -1) {
      const showtime = showtimes[showtimeIndex];
      if (typeof showtime.availableSeats === 'number') {
        showtime.availableSeats -= orderData.seats;
        showtimes[showtimeIndex] = showtime;
        setLocalData('showtimes', showtimes);
      }
    }
    
    // Get showtime details for the response
    const showtimeDetails = await getShowtimeById(orderData.showtimeId);
    
    return {
      ...newOrder,
      showtimeDetails: showtimeDetails || undefined
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}
