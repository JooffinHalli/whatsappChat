import { applySnapshot, types as t } from "mobx-state-tree";
import { mdls, str } from "mst/utils/types";
import { getTypeRoot } from "mst";
import { Item } from "./Item";

export const Menu = t
  .model("Root.Menu", {
    items: mdls(Item),
    activeItem: str("")
  })

  .actions((self) => {

    const root = getTypeRoot(self);

    return {
      add: (phoneNumber: string) => {
        self.items.push({ phoneNumber });
        self.activeItem = phoneNumber;
        root.chat.clear();
        root.chat.startRecieve();
      },

      setActiveItem: (phoneNumber: string) => {
        self.activeItem = phoneNumber;
        root.chat.clear();
        root.chat.startRecieve();
      }
    }
  })