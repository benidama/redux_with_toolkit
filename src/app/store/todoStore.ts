import { configureStore } from "@reduxjs/toolkit";
import personReducer from "../feature/todoslice"
import authReducer from '../feature/authSlice';
import { authApi } from '../api/authApi';

// Configure the Redux store
export const personStore = configureStore({
    reducer:{
        person: personReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

// Types for using in components
export type RootState = ReturnType<typeof personStore.getState>
export type AppDispatch = typeof personStore.dispatch;