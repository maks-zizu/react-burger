import {
  wsConnecting,
  wsOpen,
  wsClose,
  disconnect,
  connect,
  wsMessage,
  wsError,
} from "./actions";

describe("Тестирование корректного создания действий в websocket actions", () => {
  it("wsConnecting создание действия, сигнализирующее о статусе connecting", () => {
    const expectedAction = {
      type: "CONNECTING",
    };
    expect(wsConnecting()).toEqual(expectedAction);
  });

  it("wsOpen создание действия, сигнализирующее о статусе websocket open", () => {
    const expectedAction = {
      type: "WS_OPEN",
    };
    expect(wsOpen()).toEqual(expectedAction);
  });

  it("wsClose создание действия, сигнализирующее о статусе websocket close", () => {
    const expectedAction = {
      type: "WS_CLOSE",
    };
    expect(wsClose()).toEqual(expectedAction);
  });

  it("disconnect создание действия, сигнализирующее о статусе disconnect", () => {
    const expectedAction = {
      type: "DISCONNECT",
    };
    expect(disconnect()).toEqual(expectedAction);
  });

  it("connect подключения с полезной нагрузкой URL", () => {
    const url = "wss://norma.nomoreparties.space/orders";
    const expectedAction = {
      type: "CONNECT",
      payload: url,
    };
    expect(connect(url)).toEqual(expectedAction);
  });

  it("wsMessage создание действия с полезной нагрузкой в виде данных о новых заказах", () => {
    const ordersData = {
      success: true,
      orders: [],
      total: 100,
      totalToday: 5,
    };
    const expectedAction = {
      type: "WS_MESSAGE",
      payload: ordersData,
    };
    expect(wsMessage(ordersData)).toEqual(expectedAction);
  });

  it("wsError создание действия для обработки ошибки с сообщением", () => {
    const errorMessage = "Error occurred";
    const expectedAction = {
      type: "WS_ERROR",
      payload: errorMessage,
    };
    expect(wsError(errorMessage)).toEqual(expectedAction);
  });
});
