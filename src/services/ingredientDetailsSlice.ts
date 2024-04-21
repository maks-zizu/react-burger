import { createSlice } from "@reduxjs/toolkit";
import { IDetailsData } from "./types";

export const initialState: IDetailsData = { details: null };

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    ingredientDetailsAdd(state, action) {
      state.details = action.payload;
    },
  },
});

export const { ingredientDetailsAdd } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
