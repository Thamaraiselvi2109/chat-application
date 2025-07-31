import { createSlice } from '@reduxjs/toolkit';

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        list: ['General', 'Tech', 'Support'],
        selected: 'General', // default selected room
        searchTerm: '',
    },
    reducers: {
        selectRoom: (state, action) => {
            state.selected = action.payload;
        },
        addRoom: (state, action) => {
            const newRoom = action.payload;
            if (!state.list.includes(newRoom)) {
                state.list.push(newRoom);
            }
        },
        deleteRoom: (state, action) => {
            const roomToDelete = action.payload;
            state.list = state.list.filter(room => room !== roomToDelete);

            // Optional: Reset selected if deleted
            if (state.selected === roomToDelete) {
                state.selected = state.list[0] || '';
            }
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    }
});

export const { selectRoom, addRoom, deleteRoom, setSearchTerm } = roomsSlice.actions;
export default roomsSlice.reducer;
