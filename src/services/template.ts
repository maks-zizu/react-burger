import {
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsConnecting as LiveTableWsConnecting,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsNessage,
  wsError as LiveTableWsError,
} from "./websocket/actions";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const wsActions = {
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsNessage,
};
