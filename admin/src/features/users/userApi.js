import { supabase } from "../../services/supabaseAdmin";


// Get All Users
export const getUsers = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

    console.log("from user api", data)
    console.log(error)

  if (error) throw error;

  return data;
};

// get users by ID
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

// Update User Role
export const updateUserRole = async (id, role) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

