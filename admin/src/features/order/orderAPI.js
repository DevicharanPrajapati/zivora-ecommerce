// src/admin/features/order/orderAPI.js

import { supabase } from "../../services/supabaseAdmin";

// ==========================
// Get All Orders
// ==========================
export const getOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
  *,
  profiles (
    id,
    fullName,
    email
  ),
  addresses (
    *
  ),
  order_items (
    id,
    product_id,
    product_title,
    product_image,
    quantity,
    price
  )
`,
    )
    .order("created_at", { ascending: false });
  
    
  // console.log("Orders Error:", error);
  // console.log("Orders Data:", data);

  if (error) throw error;

  return data;
};

// ==========================
// Get Order By ID
// ==========================
export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      profiles (
        id,
        fullName,
        email
      ),
      order_items (
        id,
        product_id,
        product_title,
        product_image,
        quantity,
        price
      )
    `,
    )
    .eq("id", orderId)
    .single();

  if (error) throw error;

  return data;
};

// ==========================
// Update Order Status
// ==========================
export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({
      order_status: status,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// ==========================
// Update Payment Status
// ==========================
export const updatePaymentStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({
      payment_status: status,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;

  return data;
};
