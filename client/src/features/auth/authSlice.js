import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, logoutUser } from "./authThunks";

const initialState = {
  user: null,
  session: null,
  loading: false,
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
    },
  },

  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.session = null;
      });
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;