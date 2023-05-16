import { api, setApiState } from "api";
import { types as t } from "mobx-state-tree";
import { asyncFlow } from "mst";
import { bool, str_undf } from "mst/utils/types";
import { _ } from "utils";

export const Auth = t
  .model("Root.Auth", {
    IdInstance: str_undf(),
    ApiTokenInstance: str_undf(),
    isAuth: bool(false)
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

    login: () => {
      setApiState({
        IdInstance: +self.IdInstance!,
        ApiTokenInstance: self.ApiTokenInstance!
      });
      return api.getStateInstance().then((res) => {
        self.setIsAuthSimple(res.stateInstance === "authorized");
      });
    }
    
  }))