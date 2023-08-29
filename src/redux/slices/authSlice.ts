import { PayloadAction, createSlice} from "@reduxjs/toolkit";

interface AuthUser {
  currentUser: any;
  isLoggedIn: boolean;
  isAdmin: boolean;
  userRole: string | null;
}

const initialState: AuthUser = {
  currentUser: null,
  isLoggedIn: !!localStorage.getItem("accessToken"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  userRole: localStorage.getItem("userRole") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      state.isAdmin = action.payload.isAdmin === true;

      if (state.isAdmin) {
        state.userRole = "admin";
      }
      state.userRole = action.payload.userRole || null;
      localStorage.setItem("isAdmin", state.isAdmin.toString());
      localStorage.setItem("userRole", state.userRole || "");
    },
    logout: (state) => {
      state.isLoggedIn = false,
      state.currentUser = null;
      state.isAdmin = false;
      state.userRole = null;
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
