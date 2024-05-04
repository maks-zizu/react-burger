import { createReducer } from "@reduxjs/toolkit";
import { WebSocketState } from "../types";
import { WebsocketStatus } from "../template";
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting } from "../actions";

const initialState: WebSocketState = {
  ordersAll: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  status: WebsocketStatus.disconnected,
  connectionError: null,
};

export const websocketAllReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.connecting;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.connected;
      state.connectionError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.disconnected;
      state.ordersAll = initialState.ordersAll;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.ordersAll = action.payload;
    });
});
