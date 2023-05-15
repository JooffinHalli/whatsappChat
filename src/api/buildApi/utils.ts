import { Obj, _ } from "utils";
import { Config } from "./types";
import { DEFAULT_ERRORS } from "./constants";

export class ApiError extends Error { };

const bodySerializer = {
  'application/json': JSON.stringify,
  DEFAULT: <T>(body: T) => body
} as const;

export const serializedBody = <T>(headers: Http.RequestHeaders = {}, body: T) => {
  const key = headers["Content-Type"] || "DEFAULT";
  const serialize = bodySerializer[key];
  return serialize(body) as BodyInit;
}

export const validHeaders = (headers: any) => {
  return headers as HeadersInit;
}

export const handleResData = (res: Response) => {
  if (!res.ok) throw res;
  return res;
}

export const isError = (v: unknown): v is { message: string } => Obj.isObj(v) && ("message" in v);

export const logError = ({ method, err }: { method: string, err: string }) => {
  console.error(
    `${new Date().toLocaleTimeString()} api.${method}: ${err}`
  );
}

export const normalizedErrors = (errors: Config<any>["errors"]) => {
  return {
    ...DEFAULT_ERRORS,
    errors
  };
}