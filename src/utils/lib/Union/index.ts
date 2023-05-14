/** утилиты для юнионов */
export namespace Union {

  /** достает из юниона только строки */
  export type String<T> = T extends (`${infer X}` | string) ? X & T : never;

}