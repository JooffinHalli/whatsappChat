import { api, setApiState } from "api";
import { applySnapshot, types as t } from "mobx-state-tree";
import { bool, mdl, str_undf } from "mst/utils/types";
import { _ } from "utils";
import { Settings } from "./Settings";

export const Auth = t
  .model("Root.Auth", {
    IdInstance: str_undf(),
    ApiTokenInstance: str_undf(),
    isAuth: bool(false),
    settings: mdl(Settings)
  })

  .actions((self) => ({

    setIsAuthSimple: (value: boolean) => {
      self.isAuth = value;
    },

    setIdInstanceSimple: (value: string) => {
      self.IdInstance = value;
    },

    setApiTokenInstanceSimple: (value: string) => {
      self.ApiTokenInstance = value;
    }
    
  }))

  .actions((self) => ({

    setIdInstance: (value: string, shouldRemember: boolean) => {
      const _value = _.utf8_to_b64(value);
      if (shouldRemember) {
        localStorage.setItem("IdInstance", _value);
      }
      self.setIdInstanceSimple(value);
    },

    setApiTokenInstance: (value: string, shouldRemember: boolean) => {
      const _value = _.utf8_to_b64(value);
      if (shouldRemember) {
        localStorage.setItem("ApiTokenInstance", _value);
      }
      self.setApiTokenInstanceSimple(value);
    },

    login: async () => {
      setApiState({
        IdInstance: +self.IdInstance!,
        ApiTokenInstance: self.ApiTokenInstance!
      });
      await api.getStateInstance().then((res) => {
        if (res.stateInstance === "authorized") {
          self.setIsAuthSimple(true);
        } else throw new Error(res.stateInstance);
      })
      api.getSettings().then((res) => {
        applySnapshot(self.settings, res);
      });
    }
    
  }))