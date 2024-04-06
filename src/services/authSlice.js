import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./auth/authApi";

export const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  err: null,
};

export const userAdd = createAsyncThunk("auth/add", async (user) => {
  const res = await getUser(user);
  return res;
});

const orderDetailsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userAdd: (state) => {
      state.user = {};
      state.isLoggedIn = true;
      state.err = null;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userAdd.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(userAdd.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(userAdd.rejected, (state, action) => {
        state.err = action.error ? action.error.message : "Ошибка";
        state.loading = false;
      });
  },
});

export const { orderDetailsDel } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
