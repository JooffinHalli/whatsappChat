import { IAnyType, types as t } from 'mobx-state-tree';
import { Primitives } from 'mobx-state-tree/dist/internal';
import { LOADING_STATUSES } from 'utils';

export const str = (init: string) => t.optional(t.string, init);
export const num = (init: number) => t.optional(t.number, init);
export const bool = (init: boolean) => t.optional(t.boolean, init);

export const str_num = (init: string | number) => t.optional(t.union(t.string, t.number), init);

export const str_undf = (init?: string) => t.optional(t.union(t.string, t.undefined), init);
export const num_undf = (init?: number) => t.optional(t.union(t.number, t.undefined), init);

export const str_null = (init: string | null) => t.optional(t.union(t.string, t.null), init);
export const num_null = (init: number | null) => t.optional(t.union(t.number, t.null), init);

export const str_null_undf = (init?: number | null) => t.optional(t.union(t.number, t.null, t.undefined), init);
export const num_null_undf = (init?: number | null) => t.optional(t.union(t.number, t.null, t.undefined), init);
export const bool_null_undf = (init?: number | null) => t.optional(t.union(t.number, t.null, t.undefined), init);

export const str_num_undf = (init?: string | number) => t.optional(t.union(t.string, t.number, t.undefined), init);
export const str_num_null = (init: string | number | null) => t.optional(t.union(t.string, t.number, t.null), init);

export const mdl = <T extends IAnyType>(model: T, init = {}) => t.optional(model as T, init);
export const mdls = <T extends IAnyType>(model: T) => t.array(mdl(model));

export const liter  = <T extends Primitives>(init: T) => t.literal<T>(init);
export const union = <T extends string>(arr: T[] | Readonly<T[]>, init: T) => t.optional(t.enumeration<T>(Object.values(arr)), init);

export const LoadingStatus = union(Object.values(LOADING_STATUSES), LOADING_STATUSES.INIT);