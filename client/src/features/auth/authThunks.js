import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./authAPI";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      return await api.signup(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const auth = await api.login(userData);
      const profile = await api.getProfile(auth.user.id);
      
      return {
        session: auth.session,
        user: profile,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);


export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await api.logout();
  }
);