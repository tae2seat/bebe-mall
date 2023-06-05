import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoggedIn: !!localStorage.getItem('accessToken'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        login: (state, action) => {
            state.isLoggedIn = true
            state.currentUser = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false,
            state.currentUser = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer