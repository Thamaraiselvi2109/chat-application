// store/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: {
      'Room 1': ['Hello!'],
      'Room 2': ['Hi there!'],
    },
  },
  reducers: {
    sendMessage: (state, action) => {
      const { room, message } = action.payload;
      if (!state.messages[room]) state.messages[room] = [];
      state.messages[room].push(message);
    },
  },
});

export const { sendMessage } = ChatSlice.actions;
export default ChatSlice.reducer;
