import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import DetailsReducer from './slices/DetailsSlice';
import ThemeReducer from './slices/ThemeSlice';
import CountryReducer from './slices/CountriesSlice';
import RoomsReducer from './slices/RoomsSlice';
import ChatReducer from './slices/ChatSlice';


const themePersistConfig = {
  key: 'theme',
  storage,
};

const detailsPersistConfig = {
    key: 'details',
    storage,
};

export const store = configureStore({
  reducer: {
    details: persistReducer(detailsPersistConfig, DetailsReducer),
    theme: persistReducer(themePersistConfig, ThemeReducer),
    country: CountryReducer,
    rooms: RoomsReducer,
    chat: ChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
