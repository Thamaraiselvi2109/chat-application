// store/slices/DetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number: '',
    secretCode: '',  // simulate backend code
    userOtp: '',
    isOtpValid: null, // null = not attempted, true = valid, false = invalid
};

const DetailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        storePhoneNo(state, action) {
            state.number = action.payload.number;
            state.secretCode = action.payload.secretCode;
        },
        storeUserOtp(state, action) {
            state.userOtp = action.payload;
            state.isOtpValid = action.payload.toString() === state.secretCode.toString();
        },
        clearDetails(state) {
            Object.assign(state, initialState); // Reset to initial
        }
    },
});

export const { storePhoneNo, storeUserOtp, clearDetails } = DetailsSlice.actions;
export default DetailsSlice.reducer;
