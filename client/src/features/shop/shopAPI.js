import { supabase } from "../../services/supabseClient";

export const getShopProducts = async ({
  search = "",
  category = "",
  gender = "",
  sort = "newest",
  minPrice = 0,
  maxPrice = Infinity,
}) => {
  let query = supabase.from("products").select(
    `
      id,
      title,
      description,
      price,
      gender,
      is_featured,
      created_at,

      categories (
        id,
        name,
        slug
      ),

      product_images (
        id,
        image_url,
        is_primary
      ),

      product_variants (
  id,
  color_name,
  color_hex,
  size,
  stock
)
    `,
  );

  // Search
  if (search.trim()) {
    query = query.ilike("title", `%${search}%`);
  }

  // Category
  if (category) {
    query = query.eq("category_id", category);
  }

  // Gender
  if (gender) {
    query = query.eq("gender", gender);
  }

  // Price
  query = query.gte("price", minPrice);

  if (maxPrice !== Infinity) {
    query = query.lte("price", maxPrice);
  }

  // Sorting
  switch (sort) {
    case "price-low":
      query = query.order("price", { ascending: true });
      break;

    case "price-high":
      query = query.order("price", { ascending: false });
      break;

    case "a-z":
      query = query.order("title", { ascending: true });
      break;

    case "z-a":
      query = query.order("title", { ascending: false });
      break;

    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;

    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};
