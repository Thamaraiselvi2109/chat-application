import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number : ''
}

const DetailsSlice = createSlice({
    name : 'details',
    initialState,
    reducers : {
        storePhoneNo(state, action){
            state.number = action.payload
        }
    }
})


export default DetailsSlice.reducer;
export const {storePhoneNo} = DetailsSlice.actions;
