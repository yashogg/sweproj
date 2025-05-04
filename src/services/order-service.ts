
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderWithDetails } from './supabase-types';

export async function getUserOrders(userId: string): Promise<OrderWithDetails[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, showtimes(*, movies(*), theaters(*))')
    .eq('user_id', userId)
    .order('order_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
  
  return data as OrderWithDetails[];
}

export async function getOrderById(id: string): Promise<OrderWithDetails | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, showtimes(*, movies(*), theaters(*))')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }
  
  return data as OrderWithDetails;
}

export async function createOrder(order: Omit<Order, 'id' | 'order_date'>): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }
  
  return data as Order;
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating order:', error);
    throw error;
  }
  
  return data as Order;
}
