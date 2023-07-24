import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
  userRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.userRole = 0;
    },
    logout: (state) => {
      (state.isLoggedIn = false), (state.currentUser = null);
      state.userRole = 1;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
