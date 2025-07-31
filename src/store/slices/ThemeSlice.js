import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark : true
}

const ThemeSlice = createSlice({
    name : "theme",
    initialState,
    reducers:{
        toggleTheme(state){
            state.isDark = !state.isDark
        }
    }
})

export default ThemeSlice.reducer;
export const {toggleTheme} = ThemeSlice.actions;
