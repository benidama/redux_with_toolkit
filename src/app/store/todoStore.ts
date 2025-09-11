import { configureStore } from "@reduxjs/toolkit";
import personReducer from "../feature/todoslice"

// Configure the Redux store
export const personStore = configureStore({
    reducer:{
        person: personReducer,
    }
})

// Types for using in components
export type RootState = ReturnType<typeof personStore.getState>