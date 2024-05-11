import { websocketAllReducer } from "./websocketAllSlice.ts";
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
} from "../actions.ts";
import { WebsocketStatus } from "../template.ts";

describe("Тестирование websocketAllReducer", () => {
  const initialState = {
    ordersAll: {
      success: false,
      orders: [],
      total: 0,
      totalToday: 0,
    },
    status: WebsocketStatus.disconnected,
    connectionError: null,
  };

  it("установка соединения wsConnecting", () => {
    expect(websocketAllReducer(initialState, wsConnecting())).toEqual({
      ...initialState,
      status: WebsocketStatus.connecting,
    });
  });

  it("открытие соединения wsOpen", () => {
    expect(websocketAllReducer(initialState, wsOpen())).toEqual({
      ...initialState,
      status: WebsocketStatus.connected,
      connectionError: "",
    });
  });

  it("закрытие соединения wsClose", () => {
    expect(websocketAllReducer(initialState, wsClose())).toEqual({
      ...initialState,
      status: WebsocketStatus.disconnected,
      ordersAll: initialState.ordersAll,
    });
  });

  it("ошибка соединения wsError", () => {
    const error = "Network Error";
    expect(websocketAllReducer(initialState, wsError(error))).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  it("сообщение с полезной нагрузкой wsMessage", () => {
    const ordersAll = {
      success: true,
      orders: [
        {
          _id: "1",
          name: "Burger",
          ingredients: ["1", "2"],
          status: "done",
          number: 101,
          createdAt: "",
          updatedAt: "",
        },
      ],
      total: 100,
      totalToday: 5,
    };
    expect(websocketAllReducer(initialState, wsMessage(ordersAll))).toEqual({
      ...initialState,
      ordersAll,
    });
  });
});
