/** простые утилиты */
export namespace _ {

  export const toBlob = (v: string | number) => {
    return new Blob([v!.toString()], { type: 'application/json' });
  }

  export const utf8_to_b64 = (str: string) => {
    return window.btoa(str);
  }

  export const  b64_to_utf8 = (str: string) => {
    return window.atob(str);
  }
 
  /**
   * @example
   * const isOneOrTwo = value(1).is(1, 2) // true
  */
  export const value = (x: unknown) => ({
    is: (...args: unknown[]) => args.some(arg => arg === x)
  });

  export const smartTypeOf = (v: unknown) => v === null
    ? 'null'
    : Array.isArray(v)
      ? 'array'
      : (v instanceof Set)
        ? 'set'
        : (v instanceof Map)
          ? 'map'
          : typeof v;

  /**
   * @example
   * const areNumOrStrOrBool = typeOf(1, 2, 3).is('number') // true
  */
  export const typeOf = (...values: unknown[]) => ({
    is: (...types: ReturnType<typeof smartTypeOf>[]) => {
      return types.some(t => values.every(v => smartTypeOf(v) === t))
    }
  });

  /** Если условие верное - вернет true, иначе выбросит ошибку */
  export const assert = <T extends (string | Error)>(cond: boolean, err: T, cb?: (err: T) => void) => {
    if (!cond) {
      if (cb) cb(err);
      throw typeof err === 'string' ? new Error(err) : err;
    }
    return true;
  }
  
  /** not undefined */
  export type Defined<T> = T extends undefined ? never : T;
  
 /** not undefined */
  export type DefinedDeep<T> = keyof Defined<T> extends never
    ? Defined<T>
    : Defined<{ [k in keyof T]-?: DefinedDeep<Defined<T>[k]> }>;
          
  export type Assert<T> = (x: any) => asserts x is T;

}