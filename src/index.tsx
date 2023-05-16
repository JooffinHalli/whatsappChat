import { createRoot } from "react-dom/client";
import { App } from "./app";
import { storeContext, store } from "mst";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <storeContext.Provider value={store}>
    <App />
  </storeContext.Provider>
);