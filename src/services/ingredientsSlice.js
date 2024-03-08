import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';

export const initialState = {
  ingredientsData: [],
  loading: false,
  err: null,
};

export const ingredientsInit = createAsyncThunk(
  'ingredients/init',
  async () => {
    const res = await api.getIngredients();
    return res;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ingredientsInit.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(ingredientsInit.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.loading = false;
      })
      .addCase(ingredientsInit.rejected, (state, action) => {
        state.err = action.error ? action.error.message : 'ошибка сервера';
        state.loading = false;
      });
  },
});

export default ingredientsSlice.reducer;
