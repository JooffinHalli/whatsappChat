import { types as t } from "mobx-state-tree";
import { LoadingStatus } from "mst/utils/types";

export const LoadingStatusModel = t
  .model("Root.Chat.LoadingStatusModel", {
    loadingStatus: LoadingStatus
  });