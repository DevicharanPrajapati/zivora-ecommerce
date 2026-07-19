import { supabase } from "../../services/supabaseAdmin";

export const login = async ({ email, password }) => {
  // Login with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Get profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw profileError;

  // Only admins are allowed
  if (profile.role !== "admin") {
    await supabase.auth.signOut();
    throw new Error("Unauthorized access");
  }

  return {
    user: profile,
    session: data.session,
  };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export const getProfile = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};