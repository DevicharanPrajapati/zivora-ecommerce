import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "./productAPI";
import { supabase } from "../../services/supabseClient";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, thunkAPI) => {
    try {
      const data = await getProductById(productId);

      if (!data || data.length === 0) {
        return thunkAPI.rejectWithValue("Product not found.");
      }

      return data[0]; // supabase .eq() returns an array, we only need the row
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (slug, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
    id,
    title,
    price,
    image,
    category_id,
    categories!inner(
      id,
      name,
      slug
    )
  `,
        )
        .eq("categories.slug", slug);

      console.log("Slug:", slug);
      console.log("Data:", data);
      console.log("Error:", error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
