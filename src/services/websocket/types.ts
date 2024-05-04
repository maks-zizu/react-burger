import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export interface Order {
  _id: string;
  name: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersAll {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}

export interface WebSocketState {
  ordersAll: OrdersAll;
  status: "connecting" | "connected" | "disconnected";
  connectionError: string | null;
}

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};
