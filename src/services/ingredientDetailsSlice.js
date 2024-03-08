import { createSlice } from '@reduxjs/toolkit';

export const initialState = { details: {} };

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    ingredientDetailsAdd(state, action) {
      state.details = action.payload;
    },
  },
});

export const { ingredientDetailsAdd } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
