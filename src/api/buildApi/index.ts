import { Api, Config, DocsBase } from "./types";

const API_HOST = _API_HOST_;

export const buildApi = <D extends DocsBase>({
  IdInstance,
  ApiTokenInstance,
  openapi
}: Config<D>): Api<D> => {

  const baseUrl = `${API_HOST}/waInstance${IdInstance}`;

  const api = {} as Api<D>;

  for (const method in openapi) {
    const methodSchema = openapi[method] || {};
    const httpMethod = Object.keys(methodSchema)[0];
    const methodName = methodSchema[httpMethod].operationId || method;
    const url = `${baseUrl}/${methodName}/${ApiTokenInstance}`;

    const methodFn = async () => {
      fetch(url, {
        method: httpMethod.toUpperCase()
      });
    }

    api[method] = methodFn as any;
  }

  return api;
}