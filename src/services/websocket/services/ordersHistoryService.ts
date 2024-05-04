import store from "../../store";
import {
  ordersReceived,
  websocketConnected,
  websocketDisconnected,
} from "../slices/ordersHistorySlice";

// !!! НЕ УЧАВСТВУЕТ В КОДЕ ---> смотри socketMiddleware !!! ОСТАВИЛ ДЛЯ СЕБЯ, ЧТОБЫ ПОДСМАТРИВАТЬ НА ДРУГИХ ПРОЕКТАХ !!!

class WebSocketOrdersService {
  private socket: WebSocket | null = null;

  connect(url: string, token: string | null) {
    this.socket = new WebSocket(`${url}?token=${token}`);

    this.socket.onopen = () => {
      store.dispatch(websocketConnected());
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        store.dispatch(ordersReceived(data));
      }
    };

    this.socket.onclose = () => {
      store.dispatch(websocketDisconnected());
      setTimeout(() => this.connect(url, token), 100);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const ordersHistoryService = new WebSocketOrdersService();
