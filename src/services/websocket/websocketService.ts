import store from "../store";
import {
  ordersReceived,
  websocketConnected,
  websocketDisconnected,
} from "./websocketSlice";

class WebSocketService {
  private socket: WebSocket | null = null;

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      store.dispatch(websocketConnected());
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success && data.orders) {
        store.dispatch(ordersReceived(data.orders));
      }
    };

    this.socket.onclose = () => {
      store.dispatch(websocketDisconnected());
      // Переподключение через 5 секунд
      setTimeout(() => this.connect(url), 5000);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const websocketService = new WebSocketService();
