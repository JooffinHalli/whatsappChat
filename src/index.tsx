import { createRoot } from "react-dom/client";
import { App } from "./app";
import { storeContext, store } from "mst";
import { ConfigProvider, App as AntdApp } from "antd";
import { theme } from "utils";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ConfigProvider theme={theme}>
    <AntdApp className="app">
      <storeContext.Provider value={store}>
        <App />
      </storeContext.Provider>
    </AntdApp>
  </ConfigProvider>
);
