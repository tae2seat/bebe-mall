import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  userRole: localStorage.getItem("userRole") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.isAdmin = action.payload.isAdmin === true;

      if (state.isAdmin) {
        state.userRole = "admin";
      }
      state.userRole = action.payload.userRole || null;
      localStorage.setItem("isAdmin", state.isAdmin);
      localStorage.setItem("userRole", state.userRole);
    },
    logout: (state) => {
      (state.isLoggedIn = false), (state.currentUser = null);
      state.isAdmin = false;
      state.userRole = null;
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
