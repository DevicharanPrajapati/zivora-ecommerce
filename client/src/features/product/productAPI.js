import { supabase } from "../../services/supabseClient";

/* ===========================
   GET ALL PRODUCTS
=========================== */
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

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
        stock
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};


/* ===========================
   GET FEATURED PRODUCTS
=========================== */
export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

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
        stock
      )
    `,
    )
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

/* ===========================
   GET PRODUCT BY ID
=========================== */
export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

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
        stock,
        sku
      )
    `,
    )
    .eq("id", productId)
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   GET PRODUCTS BY CATEGORY
=========================== */
export const getProductsByCategory = async (slug) => {
  // Get category id from slug
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single();

  if (categoryError) throw categoryError;

  // Get products
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

      categories(
        id,
        name,
        slug
      ),

      product_images(
        id,
        image_url,
        is_primary
      ),

      product_variants(
        stock
      )
    `,
    )
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

/* ===========================
   GET PRODUCTS BY GENDER
=========================== */
export const getProductsByGender = async (gender) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

      categories(
        id,
        name,
        slug
      ),

      product_images(
        id,
        image_url,
        is_primary
      ),

      product_variants(
        stock
      )
    `,
    )
    .eq("gender", gender)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

/* ===========================
   GET RELATED PRODUCTS
=========================== */
export const getRelatedProducts = async (categoryId, productId, limit = 4) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

      categories(
        id,
        name,
        slug
      ),

      product_images(
        id,
        image_url,
        is_primary
      ),

      product_variants(
        stock
      )
    `,
    )
    .eq("category_id", categoryId)
    .neq("id", productId)
    .limit(limit);

  if (error) throw error;

  return data;
};

/* ===========================
   SEARCH PRODUCTS
=========================== */
export const searchProducts = async (keyword) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      title,
      description,
      price,
      gender,
      is_featured,

      categories(
        id,
        name,
        slug
      ),

      product_images(
        id,
        image_url,
        is_primary
      ),

      product_variants(
        stock
      )
    `,
    )
    .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
