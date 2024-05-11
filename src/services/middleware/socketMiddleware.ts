import type { Middleware } from "redux";
import { RootState } from "../store";
import { enqueueSnackbar } from "notistack";
import { TwsActionTypes } from "../websocket/types";

export const socketMiddleware = (
  wsActions: TwsActionTypes
): Middleware<{}, RootState> => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      console.log("🚀🚀 🚀  ~ return ~ action:", action);
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
      } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (err) => {
          enqueueSnackbar("error");
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            enqueueSnackbar("error");
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 100);
          }
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  }) as Middleware;
};
