import { types as t } from "mobx-state-tree";
import { str } from "mst/utils/types";

export const Item = t
  .model("Root.Menu.Item", {
    phoneNumber: str("")
  });