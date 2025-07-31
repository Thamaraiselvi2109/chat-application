import { configureStore } from '@reduxjs/toolkit';
import DetailsReducer from './slices/DetailsSlice';
import ThemeReducer from './slices/ThemeSlice';
import CountryReducer from './slices/CountriesSlice';
import RoomsReducer from './slices/RoomsSlice';
import ChatReducer from './slices/ChatSlice';


export const store = configureStore({
  reducer: {
    details: DetailsReducer,
    theme: ThemeReducer,
    country: CountryReducer,
    rooms: RoomsReducer,
    chat: ChatReducer,
  },
});

