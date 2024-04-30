import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersAll, WebSocketState } from "../types";

// !!! НЕ УЧАВСТВУЕТ В КОДЕ ---> смотри websocketAllSlice !!! ОСТАВИЛ ДЛЯ СЕБЯ, ЧТОБЫ ПОДСМАТРИВАТЬ НА ДРУГИХ ПРОЕКТАХ !!!

const initialState: WebSocketState = {
  ordersAll: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  status: "connecting",
  connectionError: null,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    ordersReceived(state, action: PayloadAction<OrdersAll>) {
      state.ordersAll = action.payload;
    },
    websocketConnected(state) {
      state.status = "connected";
    },
    websocketDisconnected(state) {
      state.status = "disconnected";
    },
  },
});

export const { ordersReceived, websocketConnected, websocketDisconnected } =
  websocketSlice.actions;
export default websocketSlice.reducer;
