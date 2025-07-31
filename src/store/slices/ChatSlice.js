import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: {},
    },
    reducers: {
        sendMessage: (state, action) => {
            const { room, message } = action.payload;
            if (!state.messages[room]) {
                state.messages[room] = [];
            }
            state.messages[room].push(message);
        },
    },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
