import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import userReducer from "../features/users/userSlice";
import chatReducer from '../features/Chats/chatSlice'
import usersReducer from '../features/users/allUsersSlice'
import selectedFriendReducer from '../features/users/selectedFriendSlice'
const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["user", "token"], // List of reducers to persist,
};

// const chatPersistConfig = {
//     key: "chat",
//     storage,
//     whitelist: ["distination",'message'], // List of reducers to persist,
// };
const usersPersistConfig = {
    key: "allUsers",
    storage,
    whitelist: ["users"], // List of reducers to persist,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
// const chatPersistedReducer = persistReducer(chatPersistConfig, chatReducer);
const usersPersistedReducer = persistReducer(usersPersistConfig, usersReducer);
// const selectedFriendPersistedReducer = persistReducer(selectedFriendPersistConfig, selectedFriendReducer );

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userPersistedReducer,
        allUsers: usersPersistedReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        
    devTools: true,
});

export const persistor = persistStore(store);
