import { buildApi } from "./buildApi";
import { openapi, Docs } from "./openApi";

export const api = buildApi<Docs>({
  IdInstance: 1,
  ApiTokenInstance: "a",
  openapi: openapi.paths
});