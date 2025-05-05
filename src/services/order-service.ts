
import { Order, OrderWithDetails, ShowtimeWithDetails } from './types';
import { getLocalData, setLocalData, generateId } from './local-storage-service';
import { getShowtimeById } from './showtime-service';

export async function getUserOrders(userId: string): Promise<OrderWithDetails[]> {
  try {
    const orders = getLocalData<OrderWithDetails[]>('orders', []);
    
    // Filter orders by user ID
    const userOrders = orders.filter(order => order.userId === userId);
    
    // Sort by order date, newest first
    userOrders.sort((a, b) => {
      const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
      const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
      return dateB - dateA;
    });
    
    return userOrders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

export async function getOrderById(id: string): Promise<OrderWithDetails | null> {
  try {
    const orders = getLocalData<OrderWithDetails[]>('orders', []);
    const order = orders.find(o => o.id === id) || null;
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'orderDate'>): Promise<Order> {
  try {
    const orders = getLocalData<OrderWithDetails[]>('orders', []);
    
    // Get the showtime details
    const showtime = await getShowtimeById(order.showtimeId);
    if (!showtime) {
      throw new Error(`Showtime with ID ${order.showtimeId} not found`);
    }
    
    // Generate a new ID
    const newId = generateId();
    
    // Create the new order
    const newOrder: Order = {
      ...order,
      id: newId,
      orderDate: new Date().toISOString(),
    };
    
    // Create the detailed version with showtime info
    const newOrderWithDetails: OrderWithDetails = {
      ...newOrder,
      showtimeDetails: showtime
    };
    
    // Add to orders
    orders.push(newOrderWithDetails);
    setLocalData('orders', orders);
    
    // Update available seats in the showtime
    if (typeof showtime.availableSeats === 'number') {
      const updatedSeats = showtime.availableSeats - order.seats;
      if (updatedSeats >= 0) {
        showtime.availableSeats = updatedSeats;
        const showtimes = getLocalData<ShowtimeWithDetails[]>('showtimes', []);
        const showtimeIndex = showtimes.findIndex(s => s.id === showtime.id);
        if (showtimeIndex !== -1) {
          showtimes[showtimeIndex] = showtime;
          setLocalData('showtimes', showtimes);
        }
      }
    }
    
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
  try {
    const orders = getLocalData<OrderWithDetails[]>('orders', []);
    
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
