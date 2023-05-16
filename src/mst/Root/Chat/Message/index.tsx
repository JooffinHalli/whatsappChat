import { types as t } from "mobx-state-tree";
import { str } from "mst/utils/types";

export const Message = t
  .model("Root.Chat.Message", {
    text: str("")
  });