import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loggedApi } from "../../axios";


export const getProfile = createAsyncThunk(
    'profile/getProfile',
    async (_, thunkApi) => {
        try {
            const response = await loggedApi.get('/profile')
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue
        }
    }
)

const initialState = {
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    userId:'',
    avatar: '',
    isLoading: false,
    isError: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getProfile.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            console.log(action)
            state.name = action.payload.name
            state.email = action.payload.email
            state.gender = action.payload.gender
            state.birthDate = action.payload.birthDate
            state.userId = action.payload.id
            state.avatar = action.payload.avatar
            state.isLoading = false
            state.isError = false
        })
        .addCase(getProfile.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export default profileSlice.reducer;