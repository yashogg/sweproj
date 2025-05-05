
import { Order, OrderWithDetails, ShowtimeWithDetails } from './types';
import { getLocalData, setLocalData, generateId } from './local-storage-service';
import { getShowtimeById } from './showtime-service';
import { getTheaterById } from './theater-service';

export async function getUserOrders(userId: string): Promise<OrderWithDetails[]> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    
    // Filter orders by user ID
    const userOrders = orders.filter(order => order.user_id === userId);
    
    // Sort by order date, newest first
    userOrders.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
    
    // Enhance with showtime and movie details
    const ordersWithDetails = await Promise.all(
      userOrders.map(async (order) => {
        const showtime = await getShowtimeById(order.showtime_id);
        return {
          ...order,
          showtime
        };
      })
    );
    
    return ordersWithDetails;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

// Alias for getUserOrders for compatibility
export const getOrdersByUserId = getUserOrders;

export async function getOrderById(id: string): Promise<OrderWithDetails | null> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    const order = orders.find(o => o.id === id) || null;
    
    if (!order) {
      return null;
    }
    
    // Get showtime details if available
    const showtime = await getShowtimeById(order.showtime_id);
    
    return {
      ...order,
      showtime
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'order_date'>): Promise<Order> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    
    // Get the showtime details
    const showtime = await getShowtimeById(order.showtime_id);
    if (!showtime) {
      throw new Error(`Showtime with ID ${order.showtime_id} not found`);
    }
    
    // Get theater details
    const theater = showtime.theater_id ? await getTheaterById(showtime.theater_id) : null;
    
    // Generate a new ID
    const newId = generateId();
    
    // Create the new order with consistent field naming
    const newOrder: Order = {
      ...order,
      id: newId,
      order_date: new Date().toISOString()
    };
    
    // Add to orders
    orders.push(newOrder);
    setLocalData('orders', orders);
    
    // Update available seats in the showtime
    if (showtime && typeof showtime.available_seats === 'number') {
      const updatedSeats = showtime.available_seats - order.seats;
      if (updatedSeats >= 0) {
        showtime.available_seats = updatedSeats;
        const showtimes = getLocalData('showtimes', []);
        const showtimeIndex = showtimes.findIndex(s => s.id === showtime.id);
        if (showtimeIndex !== -1) {
          showtimes[showtimeIndex] = showtime;
          setLocalData('showtimes', showtimes);
        }
      }
    }
    
    return {
      ...newOrder,
      showtime: {
        ...showtime,
        theater: theater || undefined
      }
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
  try {
    const orders = getLocalData<Order[]>('orders', []);
    
    // Find the order to update
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    // Update the order
    const updatedOrder = {
      ...orders[index],
      ...updates
    };
    
    orders[index] = updatedOrder;
    setLocalData('orders', orders);
    
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}
