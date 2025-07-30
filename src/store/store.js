import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './slices/ThemeSlice'
import CountryReducer from './slices/CountriesSlice';
import DetailsReducer from './slices/DetailsSlice';

export const store = configureStore({
    reducer:{
        theme : ThemeReducer,
        country : CountryReducer,
        details : DetailsReducer,
    }
})

