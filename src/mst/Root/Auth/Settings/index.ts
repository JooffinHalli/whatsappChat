import { types as t } from "mobx-state-tree";
import { getSettingsRes } from "mst/schemas";
import { splttPhoneNumber } from "utils";

export const Settings = t
  .model("Root.Auth.Settings", getSettingsRes)

  .views((self) => ({
    get phoneNumber() {
      return splttPhoneNumber(self.wid.split("@c.us")[0]);
    }
  }))