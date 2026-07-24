import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersThunk,
  fetchUserByIdThunk,
  updateUserRoleThunk,
} from "./userThunks";

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User By ID
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User Role
      .addCase(updateUserRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRoleThunk.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload;

        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }

        if (
          state.selectedUser &&
          state.selectedUser.id === updatedUser.id
        ) {
          state.selectedUser = updatedUser;
        }
      })
      .addCase(updateUserRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;