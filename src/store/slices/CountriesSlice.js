import { createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../../lib/getCountries";

const initialState = {
  codes: [],
  loading: 'idle',
  error: null
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.codes = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  }
});

export default countrySlice.reducer;
