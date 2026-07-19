import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./authApi";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await api.login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);