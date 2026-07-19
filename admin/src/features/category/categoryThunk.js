import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabseClient";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  }
);