import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice'

export const store = configureStore({
    reducer:{
        theme : ThemeReducer
    }
})

