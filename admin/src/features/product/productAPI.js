import { supabase } from "../../services/supabseClient";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw error;

  return data;
};

export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (
        id,
        image_url,
        is_primary
      )
    `,
    )
    .eq("id", productId);

  if (error) throw error;

  return data;
};
