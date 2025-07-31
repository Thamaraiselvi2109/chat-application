// store/slices/roomsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    list: ['Room 1', 'Room 2'],
    selected: 'Room 1',
    searchTerm: '',
  },
  reducers: {
    addRoom: (state, action) => {
      state.list.push(action.payload);
    },
    selectRoom: (state, action) => {
      state.selected = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addRoom, selectRoom, setSearchTerm } = RoomsSlice.actions;
export default RoomsSlice.reducer;
