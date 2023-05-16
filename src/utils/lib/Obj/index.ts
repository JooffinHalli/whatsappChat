import { _, Union, Arr } from "utils";

/** утилиты для объектов */
export namespace Obj {

  /** типизированный Object.keys */
  export const keys = <T extends Obj.Any>(o: T) => Object.keys(o) as Obj.Keys<T>;

  /** как reduce для массивов, только для ключей объекта */
  export const keysReduce = <A, T>(
    o: T,
    cb: (acc: A, k: keyof T) => A,
    acc: A
  ) => {
    for (const k in o) acc = cb(acc, k);
    return acc;
  }

  /** вернет true, если v это объект, иначе false */
  export const isObj = <T>(v: T): v is Required<{ [K in keyof T]: T[K] }> => (
    (v !== null) &&
    !Array.isArray(v) &&
    (typeof v === "object")
  );

  /** Любой объект */
  export type Any = { [K: string]: any };

  /** Массив значений */
  export type Values<T extends Obj.Any> = T[keyof T][];

  /** Массив ключей */
  export type Keys<T extends Obj.Any> = Union.Clear<keyof T>[];

  /** Юнион тип из значений */
  export type ValuesUnion<T extends Obj.Any> = Arr.Union<Obj.Values<T>>;

  export type isEmpty<T> = [keyof T] extends [never] ? true : false;

  export type OptionalKeysUnion<T> = { [P in keyof T]-?: {} extends Pick<T, P> ? P : never }[keyof T];

  export type MaybeEmpty<T> = isEmpty<T> extends true
    ? true
    : Union.ToTupple<Obj.OptionalKeysUnion<T>> extends Union.ToTupple<keyof T>
      ? true
      : false;

  /** если объект пустой, то undefined */
  export type Undefinedable<T> = isEmpty<T> extends true ? undefined : T;
}