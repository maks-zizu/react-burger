import { createAction } from "@reduxjs/toolkit";
import { OrdersAll } from "./types";

export const wsConnecting = createAction("CONNECTING");
export const wsOpen = createAction("WS_OPEN");
export const wsClose = createAction("WS_CLOSE");
export const disconnect = createAction("DISCONNECT");
export const connect = createAction<string, "CONNECT">("CONNECT");
export const wsMessage = createAction<OrdersAll, "WS_MESSAGE">("WS_MESSAGE");
export const wsError = createAction<string, "WS_ERROR">("WS_ERROR");

export type TLiveTableActions =
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof connect>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
