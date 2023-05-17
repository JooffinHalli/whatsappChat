import { types as t } from "mobx-state-tree";
import { bool, str } from "mst/utils/types";
import { LoadingStatusType } from "utils";

export const Message = t
  .model("Root.Chat.Message", {
    text: str(""),
    fromMe: bool(false),
    recieverPhoneNumber: str("")
  });

export type MessageType = {
  text: string
  loadingStatus: LoadingStatusType
}