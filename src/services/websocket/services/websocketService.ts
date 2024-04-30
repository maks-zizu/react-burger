import store from "../../store";
import {
  ordersReceived,
  websocketConnected,
  websocketDisconnected,
} from "../slices/websocketSlice";

// !!! НЕ УЧАВСТВУЕТ В КОДЕ ---> смотри socketMiddleware !!! ОСТАВИЛ ДЛЯ СЕБЯ, ЧТОБЫ ПОДСМАТРИВАТЬ НА ДРУГИХ ПРОЕКТАХ !!!

class WebSocketService {
  private socket: WebSocket | null = null;

  connect(url: string) {
    this.socket = new WebSocket(url);

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
      setTimeout(() => this.connect(url), 100);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService();
