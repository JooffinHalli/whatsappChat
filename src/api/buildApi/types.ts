import { Union, _ } from "utils";

// once written generic makes life easier in the future

type MethodInfo<M> = {
  entity?: unknown
  path?: string
  params?: { [K: string]: string | number | boolean }
  body?: M extends ("post" | "put") ? (BodyInit | Record<string, any>) : never
  headers?: HeadersInit
  res: unknown
}

/** Базовый интерфейс для тайпскриптовой документации */
export type DocsBase = {
  [Endpoint: string]: {
    path?: string
  } & {
    [M in Lowercase<Http.Method>]?: MethodInfo<M>
  }
}

export type OpenApiSchema = {
  type:
    | "boolean"
    | "object"
    | "number"
    | "string"
    | "integer"
    | "array"
  properties?: {
    [k in string]: OpenApiSchema
  }
  items?: OpenApiSchema
  required?: string[]
}

type OpenapiPaths<D extends DocsBase> = {
  [k in keyof D]?: {
    [k in Lowercase<Http.Method>]?: {
      responses: {
        [k in `${2|3|4|5}${number}${number}`]?: {
          operationId?: string
          content: {
            [k in _.Defined<Http.RequestHeaders["Content-Type"]>]?: {
              schema: OpenApiSchema
            }
          }
        }
      }
    }
  }
}

/** Параметры для функции buildApi */
export type Config<D extends DocsBase> = {
  IdInstance: number
  ApiTokenInstance: string
  openapi: OpenapiPaths<D>
}

type MethodField<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
  F extends keyof MethodInfo<M> // Field (params | body)
> =
  D extends { [K in E]: { [K in M]: { [K in F]: infer V } } }
    ? { [K in F]: V }
    : D extends { [K in E]: { [K in M]: { [K in F]?: infer V } } }
      ? { [K in F]?: V }
      : { [K in F]?: never }

type Path<
  D, // Docs
  E extends string // Endpoint
> =
  D extends { [K in E]: { path: infer P } }
    ? E extends P ? { path?: P } : { path: P }
    : { path?: E }

type MethodArgs<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
> =
  MethodField<D, E, M, 'params'>
  & Path<D, E>
  & MethodField<D, E, M, 'body'>
  & { headers?: Http.RequestHeaders }

type MethodRes<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
> =
  D extends {
    [k in E]: {
      [k in M]: {
        res: infer R
      }
    }
  } ? R : never;

type MethodFn<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
> =
  [keyof MethodArgs<D, E, M>] extends {}
    ? (args?: MethodArgs<D, E, M>) => Promise<MethodRes<D, E, M>>
    : (args: MethodArgs<D, E, M>) => Promise<MethodRes<D, E, M>>

/** готовый API на выходе */
export type Api<D extends DocsBase> = {
  [method in keyof D]: MethodFn<
    D,
    Union.String<method>,
    Union.String<Exclude<keyof D[method], "path">>
  >
}