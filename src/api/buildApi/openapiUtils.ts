import { Obj, _ } from "utils";
import { Config, OpenApiSchema } from "./types";
import { ApiError, logError } from "./utils";

export const getSchema = (
  res: Response,
  method: string,
  httpMethod: string,
  errors: _.DefinedDeep<Config<any>["errors"]>,
  openapi: Config<any>["openapi"]["paths"]
) => {

  const _logError = (err: string) => () => logError({ method, err });
  const toStrKeys = (obj: Record<string, any>) => {
    return Obj.keys(obj).toString().split(",").join(", ");
  }

  _.assert(
    !!openapi?.[method],
    new ApiError(errors.unknown)
  );

  const responses = openapi?.[method]?.[httpMethod]?.responses;

  _.assert(
    res.status in responses,
    new ApiError(errors.wrongStatus),
    _logError(`получен стутус ${res.status}, допустимые статусы - ${toStrKeys(responses)}`)
  );

  const content = responses[res.status].content;
  const contentType = res.headers.get("Content-Type")?.split(";")[0]!;

  _.assert(
    (!!contentType ? (contentType in content) : false),
    new ApiError(errors.wrongHeaders),
    _logError(`получен Content-Type ${contentType}, допустимые значения - ${toStrKeys(content)}`)
  );
  
  return content[contentType].schema;
}

class SchemaAsserter {

  #schema = {} as OpenApiSchema;
  #data = undefined as any;
  #endpoint = "";
  #method = "";
  #errors = {} as _.Defined<Config<any>["errors"]>;

  constructor(
    schema: OpenApiSchema,
    data: any,
    errors: _.Defined<Config<any>["errors"]>,
    endpoint: string,
    method: string
  ) {
    this.#schema = schema;
    this.#data = data;
    this.#errors = errors;
    this.#endpoint = endpoint;
    this.#method = method;
    this.#assert(this.#schema, this.#data);
  }

  #assert(schema: OpenApiSchema, data: any, field?: string) {
    const schemaType = this.#schemaType(schema);
    const assert = this.#TYPE_HANDLER[schemaType];
    assert(schema, data, field);
  }

  #schemaType(schema: OpenApiSchema) {
    return schema.type || (("items" in schema) ? "array" : undefined);
  }

  #dataType(data: any) {
    const type = _.smartTypeOf(data);
    return type === "number" ? "integer" : type;
  }

  #TYPE_HANDLER = {
    "string": this.#primitiveAsserter(),
    "integer": this.#primitiveAsserter(),
    "boolean": this.#primitiveAsserter(),
    "object": this.#assertObject.bind(this),
    "array": this.#assertArray.bind(this)
  }

  #primitiveAsserter() {
    return (schema: OpenApiSchema, data: any, field: string) => {
      const dataType = this.#dataType(data);
      _.assert(
        dataType === schema.type,
        new ApiError(this.#errors.typeGuard),
        this.#logError(`поле "${field}" имеет тип "${dataType}", но должно иметь тип "${schema.type}"`)
      );
    }
  }

  #assertObject(schema: OpenApiSchema, data: Record<string, OpenApiSchema>) {
    const { properties, required = [] } = schema;

    for (const field in properties) {
      if (required.includes(field)) {
        _.assert(
          field in data,
          new ApiError(this.#errors.typeGuard),
          this.#logError(
            `респонс не содержит обязательных полей
            \n поля респонса: ${this.#objKeysToStr(data)}
            \n обязательные поля: ${this.#arrToStr(required)}`
          )
        );
      }
    }

    for (const field in data) {
      _.assert(
        field in properties!,
        new ApiError(this.#errors.typeGuard),
        this.#logError(
          `поле "${field}" не существует в схеме для респонса
          \n поля респонса: ${this.#objKeysToStr(data)}
          \n допустимые поля: ${this.#objKeysToStr(properties!)}`
        )
      );

      const subSchema = properties![field];
      this.#assert(subSchema, data[field], field);
    }
  }

  #assertArray(schema: OpenApiSchema, data: any[]) {
    _.assert(
      Array.isArray(data),
      new ApiError(this.#errors.typeGuard),
      this.#logError(`ожидалася тип "array", получен тип "${this.#dataType(data)}"`)
    );
    
    for (const el of data) {
      this.#assertObject(schema.items!, el);
    }
  }

  #logError(err: string) {
    return () => {
      logError({
        method: this.#endpoint,
        err
      });
    }
  }

  #objKeysToStr(obj: Record<string, any>) {
    return this.#serialized(Object.keys(obj));
  }

  #arrToStr(arr: string[]) {
    return this.#serialized(arr);
  }

  #serialized(data: Record<string, any> | any[]) {
    return data.toString().split(",").join(", ");
  }
}

export const assertSchema = (
  data: any,
  schema: OpenApiSchema,
  errors: _.Defined<Config<any>["errors"]>,
  method: string,
  httpMethod: string
) => {

  const _logError = (err: string) => () => logError({ method, err });

  const typeofData = _.smartTypeOf(data);

  _.assert(
    typeofData === schema.type,
    new ApiError(errors.typeGuard),
    _logError(`ожидалася тип "${schema.type}", получен тип "${typeofData}"`)
  );

  new SchemaAsserter(schema, data, errors, method, httpMethod);
}