import { supabase } from "../../services/supabseClient";

// =======================================================
// Get User Addresses
// =======================================================

export const getUserAddresses = async (userId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// =======================================================
// Get Address By Id
// =======================================================

export const getAddressById = async (addressId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", addressId)
    .single();

  if (error) throw error;

  return data;
};

// =======================================================
// Add Address
// =======================================================

export const addAddress = async (address) => {
  const { data, error } = await supabase
    .from("addresses")
    .insert(address)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// =======================================================
// Update Address
// =======================================================

export const updateAddress = async (addressId, updates) => {
  const { data, error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", addressId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// =======================================================
// Delete Address
// =======================================================

export const deleteAddress = async (addressId) => {
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);

  if (error) throw error;

  return addressId;
};

// =======================================================
// Set Default Address
// =======================================================

export const setDefaultAddress = async (userId, addressId) => {
  // Remove previous default
  const { error: resetError } = await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", userId);

  if (resetError) throw resetError;

  // Set new default
  const { data, error } = await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", addressId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
};