import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./services/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ProvideAuth } from "./services/auth/auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider />
    <BrowserRouter>
      <ProvideAuth>
        <Provider store={store}>
          <App />
        </Provider>
      </ProvideAuth>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
