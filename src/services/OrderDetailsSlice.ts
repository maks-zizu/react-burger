import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./api";
import { IOrderDetailsDataServer } from "./types";

export const initialState: IOrderDetailsDataServer = {
  orderDetailsData: null,
  loading: false,
  err: null,
};

export const orderDetailsAdd = createAsyncThunk(
  "orderDetails/add",
  async (order: string[]) => {
    const res = await api.addOrder(order);
    return res;
  }
);

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    orderDetailsDel: (state) => {
      state.orderDetailsData = null;
      state.err = null;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(orderDetailsAdd.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(orderDetailsAdd.fulfilled, (state, action) => {
        state.orderDetailsData = action.payload;
        state.loading = false;
      })
      .addCase(orderDetailsAdd.rejected, (state, action) => {
        state.err = action.error
          ? action.error.message
          : "Ошибка оформления заказа";
        state.loading = false;
      });
  },
});

export const { orderDetailsDel } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
