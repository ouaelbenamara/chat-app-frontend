import { createSlice } from "@reduxjs/toolkit";


const initialState = { users: []}


export const usersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
     
        setUsers: (state, action) => {
            console.log('exec',action.payload)
            state.users = action.payload
        }
    }
})
export const { setUsers} = usersSlice.actions;
export default usersSlice.reducer;
export const selectAllUsers = (state) => state?.allUsers.users

