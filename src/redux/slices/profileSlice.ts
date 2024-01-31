import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  id: number | null;
  avatar: string;
  isAdmin: number;
}

interface ProfileState extends UserProfile {
  isLoading: boolean;
  isError: boolean;
}

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "https://api.tae2seat.com/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data)
      return response.data as UserProfile;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: ProfileState = {
  name: "",
  email: "",
  gender: "",
  birthDate: "",
  id: null,
  avatar: "",
  isAdmin: 0,
  isLoading: false,
  isError: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
       const {
          name,
          email,
          gender,
          birthDate,
          id,
          avatar,
          isAdmin,
        } = action.payload;
        state.name = name;
        state.email = email;
        state.gender = gender;
        state.birthDate = birthDate;
        state.id = id;
        state.avatar = avatar;
        state.isAdmin = isAdmin;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default profileSlice.reducer;
