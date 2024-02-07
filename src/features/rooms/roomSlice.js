import { createSlice } from "@reduxjs/toolkit";


const initialState = { room:[] }


export const userSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
     setRoom:(state,action)=>{
        state.room = action.payload
     }
    }
})
export const { setRoom} = userSlice.actions;
export default userSlice.reducer;
export const selectRooms = (state)=>state.rooms.room
