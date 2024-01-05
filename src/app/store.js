import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import userReducer from "../features/users/userSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "token"], // List of reducers to persist, in this case, "user"
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        
    devTools: true,
});

export const persistor = persistStore(store);
