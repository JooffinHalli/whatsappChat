import { types as t } from "mobx-state-tree";
import { mdls } from "mst/utils/types";
import { Message } from "./Message";
import { api } from "api";

export const Chat = t
  .model("Root.Chat", {
    messages: mdls(Message)
  })
  .actions((self) => ({
    load: () => {
      api.receiveNotification();
    }
  }))