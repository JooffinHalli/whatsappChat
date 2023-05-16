import { _ } from "utils";
import { buildApi } from "./buildApi";
import { openapi, Docs } from "./openApi";
import { ApiError } from "./buildApi/utils";

const apiState = {
  IdInstance: undefined as number | undefined,
  ApiTokenInstance: undefined as string | undefined
}

type ApiState = typeof apiState;

export const setApiState = ({ IdInstance, ApiTokenInstance }: ApiState) => {
  apiState.IdInstance = IdInstance;
  apiState.ApiTokenInstance = ApiTokenInstance;
}

export const getApiState = () => {
  return apiState;
}

export const assertApiState: _.Assert<_.DefinedDeep<ApiState>> = (state: ApiState) => {
  const shouldThrow = (!state.IdInstance || !state.ApiTokenInstance);
  if (shouldThrow) throw new ApiError("Некорректный IdInstance или ApiTokenInstance");
}

export const api = buildApi<Docs>({
  openapi: openapi.paths
});