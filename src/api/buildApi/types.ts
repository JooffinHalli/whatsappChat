import { Obj, Union, _ } from "utils";

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
  /** Поле paths из openapi */
  openapi: OpenapiPaths<D>
  /** Ошибки на различные события */
  errors?: {
    /** Если не удалось установить соединение с сервером */
    connection?: string
    /** любая неизвестная ошибка на сервере */
    unknown?: string
    /** Если пришел статус не описанный в openapi */
    wrongStatus?: string
    /** Если пришел header не описанный в openapi */
    wrongHeaders?: string
    /** Если пришел другой формат данных, например, ожидался json, пришел blob */
    resType?: string
    /** Если интерфейс даты из респонса не соответствует схеме из openapi */
    typeGuard?: string
    /** Сообщение ошибки, которое выбросится при ручном аборте запроса */
    abort?: string
  }
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

    export type ExtraArgs = {
      /**
       * указываем, какой тип данных ожидаем с сервера,
       * в зависимости от этого поля у респонса будет вызываться соответствующий метод,
       * по дефолту стоит `json`
       */
      responseType?: 'json' | 'text' | 'formData' | 'blob' | 'arrayBuffer'
      /** экземпляр класса AbortController, нужен для прерывания запросов */
      abortController?: AbortController
    }

export type MethodArgs<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
> =
  MethodField<D, E, M, 'params'>
  & Path<D, E>
  & MethodField<D, E, M, 'body'>
  & { headers?: Http.RequestHeaders }
  & ExtraArgs

export type MethodRes<
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

export type MethodFn<
  D, // Docs
  E extends string, // Endpoint
  M extends string, // HttpMethod
> =
  Obj.MaybeEmpty<MethodArgs<D, E, M>> extends true
    ? (args?: Obj.Undefinedable<MethodArgs<D, E, M>>) => Promise<_.Defined<MethodField<D, E, M, 'res'>['res']>>
    : (args: MethodArgs<D, E, M>) => Promise<_.Defined<MethodField<D, E, M, 'res'>['res']>>;
  

/** готовый API на выходе */
export type Api<D extends DocsBase> = {
  [method in keyof D]: MethodFn<
    D,
    Union.String<method>,
    Union.String<Exclude<keyof D[method], "path">>
  >
}