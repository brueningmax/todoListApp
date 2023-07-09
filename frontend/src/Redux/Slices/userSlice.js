import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: null,
            name: null,
            isAdmin: null,
        },
        token: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = {
                id: null,
                name: null,
                isAdmin: null,
            }
            state.token = null
        }
    }
})
export const { setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;