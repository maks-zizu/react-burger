export interface Order {
  _id: string;
  name: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface WebSocketState {
  orders: Order[];
  status: "idle" | "connected" | "disconnected";
}
