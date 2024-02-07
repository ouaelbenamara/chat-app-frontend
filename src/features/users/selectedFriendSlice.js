import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedFriend: false, messages: null }

export const selectedFriendSlice = createSlice({
    name: 'selectedFriend',
    initialState,
    reducers: {

        setSelectedFriend: (state, action) => {
            console.log(action.payload.friend)
            state.selectedFriend = action.payload.friend
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        resetSelectedFriend:(state)=>{
            state.selectedFriend = false
            state.messages = null
        }
    }
})
export const { resetSelectedFriend, setSelectedFriend, setMessages } = selectedFriendSlice.actions;
export default selectedFriendSlice.reducer;
export const selecteselectedSelectedFriend = (state) => state.selectedFriend.selectedFriend
export const selecteMessages = (state) => state.selectedFriendSlice.messages