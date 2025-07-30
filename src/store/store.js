import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice'
import CountryReducer from './slices/CountriesSlice'

export const store = configureStore({
    reducer:{
        theme : ThemeReducer,
        country : CountryReducer
    }
})

