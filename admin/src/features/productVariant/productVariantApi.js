import { supabase } from "../../services/supabaseAdmin";

/* ===========================
   GET PRODUCT VARIANTS
=========================== */
export const getProductVariants = async (productId) => {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
};

/* ===========================
   GET SINGLE VARIANT
=========================== */
export const getVariantById = async (variantId) => {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("id", variantId)
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   CREATE VARIANT
=========================== */
export const createVariant = async (variantData) => {
  const { data, error } = await supabase
    .from("product_variants")
    .insert(variantData)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   UPDATE VARIANT
=========================== */
export const updateVariant = async (variantId, variantData) => {
  const { data, error } = await supabase
    .from("product_variants")
    .update(variantData)
    .eq("id", variantId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/* ===========================
   DELETE VARIANT
=========================== */
export const deleteVariant = async (variantId) => {
  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", variantId);

  if (error) throw error;

  return variantId;
};