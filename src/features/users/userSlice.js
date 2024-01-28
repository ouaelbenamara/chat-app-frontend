import { createSlice } from "@reduxjs/toolkit";


const initialState = { user: null, token: null }


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null;
            state.user = null;

        },
        setCredentials: (state, action) => {
            console.log(action.payload)
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setUser:(state,action)=>{
            state.user = action.payload
        }
    }
})
export const { setCredentials, logOut, setUser } = userSlice.actions;
export default userSlice.reducer;
export const selectToken = (state) => state.user.token
export const selectUser = (state) => state.user.user