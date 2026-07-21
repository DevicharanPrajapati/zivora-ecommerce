import { supabase } from "../../services/supabaseAdmin";
// console.log("🔥 productApi loaded");

/* ===========================
   GET ALL PRODUCTS
=========================== */
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        id,
        name
      ),
      product_images (
        id,
        image_url,
        is_primary
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

/* ===========================
   GET SINGLE PRODUCT
=========================== */
export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        id,
        name
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
   CREATE PRODUCT
=========================== */
export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   UPDATE PRODUCT
=========================== */
export const updateProduct = async (productId, productData) => {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   DELETE PRODUCT
=========================== */
export const deleteProduct = async (productId) => {
  console.log("Deleting:", productId);

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .select();

  // console.log("Deleted data:", data);
  // console.log("Delete error:", error);

  if (error) throw error;

  return data;
};

/* ===========================
   UPLOAD PRODUCT IMAGE
=========================== */
export const uploadProductImage = async (
  productId,
  imageUrl,
  isPrimary = false,
) => {
  const { data, error } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      image_url: imageUrl,
      is_primary: isPrimary,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   GET PRODUCT IMAGES
=========================== */
export const getProductImages = async (productId) => {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("is_primary", { ascending: false });

  if (error) throw error;

  return data;
};

/* ===========================
   DELETE PRODUCT IMAGE
=========================== */
export const deleteProductImage = async (imageId) => {
  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId);

  if (error) throw error;

  return true;
};

/* ===========================
   SET PRIMARY IMAGE
=========================== */
export const setPrimaryImage = async (productId, imageId) => {
  // Remove previous primary image
  const { error: resetError } = await supabase
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId);

  if (resetError) throw resetError;

  // Set selected image as primary
  const { data, error } = await supabase
    .from("product_images")
    .update({ is_primary: true })
    .eq("id", imageId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const uploadImageToStorage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("products").getPublicUrl(fileName);

  return publicUrl;
};
