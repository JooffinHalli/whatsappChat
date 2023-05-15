import { _ } from '../../_';

type BaseType = ReturnType<typeof _.smartTypeOf> | '$same'

type AnyType = BaseType | ObjectImp | CollectionImp | FunctionImp

type ObjectImp = {
  [K in (string | '$string' | `${string}?`)]?: AnyType
}

type ArrayImp = 
  | [ObjectImp, ('...' | '?...')] | [ObjectImp, ('...' | '?...'), number?]
  | _.ReadonlyDeep<[ObjectImp, ('...' | '?...')] | [ObjectImp, ('...' | '?...'), number?]>

type ListImp = AnyType[]
type CollectionImp = ArrayImp | ListImp
  
type FunctionImp = (...args: any) => AnyType

type ImpMap = {
  object: ObjectImp
  array: ArrayImp
  list: ListImp
  collection: CollectionImp
  function: FunctionImp
}

export type Implementation =
  | ObjectImp | CollectionImp
  | _.ReadonlyDeep<ObjectImp | CollectionImp>

export type ImplementationOf<T extends keyof ImpMap> = ImpMap[T]