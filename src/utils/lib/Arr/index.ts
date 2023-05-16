/** утилиты для массивов */
export namespace Arr {

  /** Юнион тип из элементов массива */
  export type Union<T extends readonly any[]> = T[number];

  export type Prepend<A extends unknown[], T> = [T, ...A];
      
}