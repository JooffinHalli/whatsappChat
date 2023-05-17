import { Union, _ } from "utils";
import { Api, Config, DocsBase, MethodArgs } from "./types";
import { ApiError, handleResData, isError, logError, normalizedErrors, serializedBody, validHeaders } from "./utils";
import { API_HOST } from "./constants";
import { assertSchema, getSchema } from "./openapiUtils";
import { assertApiState, getApiState } from "api";

export const buildApi = <D extends DocsBase>({
  openapi,
  errors
}: Config<D>): Api<D> => {

  const _errors = normalizedErrors(errors);
  
  const api = {} as Api<D>;
  
  for (const method in openapi) {
    const methodSchema = openapi[method] || {};
    const httpMethod = Object.keys(methodSchema)[0];
    const methodName: Union.String<keyof Api<D>> = methodSchema[httpMethod].operationId || method;

    const _logError = (err: string) => logError({ method, err });

    const handleResError = async (e: Error | Response) => {
      if (e instanceof Response) {
        const data = await e.json();
        if (isError(data)){
          _logError(data.message);
          throw new ApiError(data.message);
        }
        throw new ApiError(_errors.resType);
      } else {
        _logError(e.message);
        throw new ApiError(_errors.unknown);
      }
    }

    const methodFn = async (args = {} as MethodArgs<D, typeof method, typeof httpMethod>) => {

      const {
        path,
        body,
        headers = { "Content-Type": "application/json" } as Http.RequestHeaders,
        responseType = "json",
        assert = true,
        abortController = new AbortController()
      } = args;

      const { IdInstance, ApiTokenInstance } = getApiState();

      if (assert) assertApiState({ IdInstance, ApiTokenInstance });

      const baseUrl = `${API_HOST}/waInstance${IdInstance}`;
      const url = `${baseUrl}/${methodName}/${ApiTokenInstance}`;

      const [_, ...pathWithoutMethod] = (path || "").split('/');

      const finalUrl = path
        ? `${url}/${pathWithoutMethod.join("/")}`
        : url;

      try {
        const res = await fetch(finalUrl, {
          method: httpMethod.toUpperCase(),
          headers: validHeaders(headers),
          body: serializedBody(headers, body),
          signal: abortController.signal
        }).then(handleResData).catch(handleResError);
  
        const schema = assert ? getSchema(
          res,
          methodName || method,
          httpMethod,
          _errors,
          openapi
        ) : null;

        const data = await res[responseType]().catch(() => {
          _logError(`не удалось привести response к '${responseType}'`);
          throw new ApiError(_errors.resType);
        });

        if (schema) {
          assertSchema(data, schema, _errors, method, httpMethod);
        }

        return data;
      }
      catch(err: any) {
        if (err?.name === 'AbortError') throw new ApiError(_errors.abort);
        if (err instanceof ApiError) throw err;

        throw new Error(_errors.connection);
      }
    }

    api[methodName] = methodFn as any; // any is ok here
  }

  return api;
}