import { applySnapshot, types as t } from "mobx-state-tree";
import { str } from "mst/utils/types";
import { api } from "api";
import { getTypeRoot } from "mst";
import { getNumbers } from "utils";
import { Docs } from "api/openApi";
import { LoadingStatusModel } from "./LoadingStatusModel";

let delay = 5000;
let isRecieving = false;

type ResType = Docs["receiveNotification"]["get"]["res"];

const receiveNotification = async (cb: (res: ResType) => void) => {
  isRecieving = true;
  delay = 500; // speed up

  while (isRecieving) {
    await new Promise((rs) => setTimeout(rs, delay)); // sleep
    await api.receiveNotification({ assert: false })
      .then(async (res) => {
        cb(res);
        if (!res?.receiptId) {
          delay = 5000; // slow down
          return;
        }
        await api.deleteNotification({
          path: `deleteNotification/${res.receiptId}`
        });
      });
  }
}

const getChatId = (phoneNumber: string) => `${getNumbers(phoneNumber)}@c.us`;

export const Chat = t
  .model("Root.Chat", {
    fromMeMessage: str(""),
    resposeMessage:str(""),
    msgLoadingStatusMap: t.map(LoadingStatusModel)
  })

  .actions((self) => ({
    setFromMessage: (text: string) => {
      self.fromMeMessage = text;
    },
    setResponseMessage: (text: string) => {
      self.resposeMessage = text;
    }
  }))

  .actions((self) => {
    const root = getTypeRoot(self);

    return {
      send: async (message: string) => {
        const chatId = getChatId(root.menu.activeItem);

        self.msgLoadingStatusMap.set(
          root.menu.activeItem,
          { loadingStatus: "PENDING" }
        );

        self.setFromMessage(message);
        
        await api.sendMessage({
          body: { chatId, message }
        }).then(() => {
          applySnapshot(
            self.msgLoadingStatusMap.get(root.menu.activeItem)!,
            { loadingStatus: "LOADED" }
          );
        })
      },

      startRecieve: async () => {
        const pushMsg = (res: ResType) => {
          const msg = res?.body?.messageData?.textMessageData?.textMessage;
          if (msg) {
            self.setResponseMessage(msg);
          }
        }

        await receiveNotification(pushMsg);
      },

      clear: () => {
        self.setFromMessage("");
        self.setResponseMessage("");
      }
    }
  });