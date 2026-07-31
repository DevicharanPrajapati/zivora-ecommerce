import { supabase } from "../../services/supabseClient";

// =======================================================
// Place Order
// =======================================================
// =======================================================
// Place Order
// =======================================================

export const placeOrder = async ({
  userId,
  addressId,
  paymentMethod,
}) => {
  // Get Cart Items
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      products (
        id,
        title,
        price,
        stock,
        product_images (
          id,
          image_url,
          is_primary
        )
      )
    `)
    .eq("user_id", userId);

  if (cartError) throw cartError;

  if (!cartItems.length) {
    throw new Error("Your cart is empty.");
  }

  // Check Stock
  for (const item of cartItems) {
    if (item.quantity > item.products.stock) {
      throw new Error(
        `${item.products.title} has only ${item.products.stock} item(s) left in stock.`
      );
    }
  }

  // Calculate Total
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.products.price) * item.quantity,
    0
  );

  // Create Order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      address_id: addressId,
      total_amount: totalAmount,
      payment_method: paymentMethod,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create Order Items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.products.id,
    quantity: item.quantity,
    price: item.products.price,
    product_title: item.products.title,
    product_image:
      item.products.product_images.find((img) => img.is_primary)
        ?.image_url ||
      item.products.product_images[0]?.image_url ||
      null,
  }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (orderItemsError) throw orderItemsError;

  // Update Product Stock
  for (const item of cartItems) {
    const { error } = await supabase
      .from("products")
      .update({
        stock: item.products.stock - item.quantity,
      })
      .eq("id", item.products.id);

    if (error) throw error;
  }

  // Clear Cart
  const { error: clearCartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (clearCartError) throw clearCartError;

  return order;
};

// =======================================================
// Get User Orders
// =======================================================

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      addresses (
        id,
        full_name,
        phone,
        city,
        state
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// =======================================================
// Get Order Details
// =======================================================

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      addresses (*),
      order_items (
        id,
        quantity,
        price,
        product_title,
        product_image
      )
    `)
    .eq("id", orderId)
    .single();

  if (error) throw error;

  return data;
};
