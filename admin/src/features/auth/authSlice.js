import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./authThunks";

const initialState = {
  user: null,
  session: null,

  loading: false, // login/logout API calls
  initializing: true, // checking existing session on app startup

  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setSession(state, action) {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },

    clearSession(state) {
      state.user = null;
      state.session = null;
      state.error = null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setInitializing(state, action) {
      state.initializing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.session = null;
      });
  },
});

export const { setSession, clearSession, setLoading,
  setInitializing, } = authSlice.actions;

export default authSlice.reducer;
