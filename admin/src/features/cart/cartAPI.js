import { supabase } from "../../services/supabseClient";

export const addToCart = async (userId, productId) => {
  // Check if product already exists in cart
  const { data: existingItem, error: fetchError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  // If exists → increase quantity
  if (existingItem) {
    const { data, error } = await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + 1,
      })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Else → insert new item
  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      user_id: userId,
      product_id: productId,
      quantity: 1,
    })
    .select()
    .single();
  // console.log("cartd", data);
  if (error) throw error;
  // console.log(data);
  return data;
};

// Fetch User Cart
export const getCart = async (userId) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `id,
    quantity,
    products(
    id,
    title,
    price,
    image
    )
    `,
    )
    .eq("user_id", userId);

  if (error) throw error;
// console.log(data)
  return data;
};

// Update Quantity
export const updateQuantity = async (cartId, quantity) => {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Remove Item
export const removeCartItem = async (cartId) => {
  const { error } = await supabase.from("cart_items").delete().eq("id", cartId);

  if (error) throw error;

  return true;
};

// Clear Cart
export const clearCart = async (userId) => {
  const { error } = supabase.from("cart_items").delete().eq("user_id", userId);

  if (error) throw error;
  return true;
};
