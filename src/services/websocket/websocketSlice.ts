import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, WebSocketState } from "./types";

const initialState: WebSocketState = {
  orders: [],
  status: "idle",
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    ordersReceived(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
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
