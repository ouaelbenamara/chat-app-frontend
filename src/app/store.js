import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import userReducer from "../features/users/userSlice";
import chatReducer from '../features/Chats/chatSlice';
import usersReducer from '../features/users/allUsersSlice';
import roomReducer from '../features/rooms/roomSlice'
// const makeUserPersistConfig = (userId) => ({
//     key: `user-${userId}`,
//     storage,
//     whitelist: ["user", "token"], // List of reducers to persist
// });
// const userPersistedReducer = (userId) => persistReducer(makeUserPersistConfig(userId), userReducer);

const usersPersistConfig = {
    key: "allUsers",
    storage,
    whitelist: ["users"], // List of reducers to persist,
};
const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["user",'token'], // List of reducers to persist,
};
const roomPersistConfig = {
    key: "room",
    storage,
    whitelist: ["room"], // List of reducers to persist,
};

const usersPersistedReducer = persistReducer(usersPersistConfig, usersReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const roomsPersistedReducer = persistReducer(roomPersistConfig, roomReducer);

const staticReducer = {
    chat: chatReducer,
    allUsers: usersPersistedReducer,
    user: userPersistedReducer,
    rooms: roomsPersistedReducer,
    // onlineUsers:{},
    [apiSlice.reducerPath]: apiSlice.reducer,
};

const createReducer = (asyncReducer = {}) => {
    return combineReducers({
        ...staticReducer,
        // ...asyncReducer,
    });
};

// export const injectAsyncReducer = (store, userId, asyncReducer) => {
//     if (store) {
//         const userPersistConfig = makeUserPersistConfig(userId);
//         const userPersistedReducer = persistReducer(userPersistConfig, asyncReducer);

//         store.replaceReducer(
//             combineReducers({
//                 ...staticReducer,
//                 onlineUsers: userPersistedReducer,
//             })
//         );
//     } else {
//         console.error('Store is not defined.');
//     }
// };

export const store = configureStore({
    reducer:createReducer() ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export const persistor = persistStore(store);
