import { supabase} from "../../services/supabaseAdmin"

// Get all categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// Create category
export const createCategory = async (categoryData) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(categoryData)
    .select()
    .single();

    console.log(error);
  if (error) throw error;

  return data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
  const { data, error } = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Delete category
export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return id;
};