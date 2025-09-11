import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import {personStore} from "./app/store/todoStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={personStore}>
      <App />
    </Provider>
  </StrictMode>
);
