import { createSlice } from "@reduxjs/toolkit";


const initialState = { distination: null, messages1: [],messages2:[] }


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setDistination:(state,action)=>{
            state.distination = action.payload.distination
        },
        setMessages: (state, action) => {
            console.log('action.payload:',action.payload)
            // console.log(action.payload)
            state.messages1 = action.payload.messages1
            state.messages2 = action.payload.messages2
        }
        ,setMessages1:(state,action)=>{
            state.messages1.push(...action.payload)
        }
        ,setMessages2:(state,action)=>{
            // console.log(...action.payload)
            state.messages2.push(...action.payload)
        },resetChat:(state)=>{
            state.distination = null
            state.messages1 = []
            state.messages2 = []
        }
    }
})
export const { resetChat, setChat, setMessages, setDistination, setMessages1, setMessages2 } = chatSlice.actions;
export default chatSlice.reducer;
export const selectDistination = (state) => state.chat.distination
export const selectMessage = (state) => state.chat.message