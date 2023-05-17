import { types as t } from "mobx-state-tree";
import { mdl } from "mst/utils/types";
import { _ } from "utils";

import { Auth } from "./Auth";
import { Chat } from "./Chat";
import { Menu } from "./Menu";

export const Root = t
  .model("Root", {
     
    auth: mdl(Auth),
    chat: mdl(Chat),
    menu: mdl(Menu)
   
   })
   .actions((self) => ({

      afterCreate() {
        const IdInstanceB64 = localStorage.getItem("IdInstance");
        const ApiTokenInstanceB64 = localStorage.getItem("ApiTokenInstance");
        const isAuthed = (!!IdInstanceB64 && !!ApiTokenInstanceB64);
        if (isAuthed) {
          self.auth.setIdInstanceSimple(_.b64_to_utf8(IdInstanceB64));
          self.auth.setApiTokenInstanceSimple(_.b64_to_utf8(ApiTokenInstanceB64));
          self.auth.login();
        }
      }

   }))