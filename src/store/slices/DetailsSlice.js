import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number: '',
    secretCode : '',
    userOtp : ''
}

const DetailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        storePhoneNo(state, action) {
            state.number = action.payload.number;
            state.secretCode = action.payload.secretCode;
        },
        storeUserOtp(state,action) {
            state.userOtp = action.payload
        }
    }
})


export default DetailsSlice.reducer;
export const { storePhoneNo, storeUserOtp } = DetailsSlice.actions;
