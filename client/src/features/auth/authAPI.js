import { supabase } from "../../services/supabseClient";

export const signup = async ({ fullName, email, password }) => {
  //creating auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  //Create profile
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      fullName,
      email,
    });

    if (profileError) throw profileError;
  }
  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const logout = async () => {
  await supabase.auth.signOut();
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
