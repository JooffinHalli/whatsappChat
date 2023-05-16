import { createContext, useContext } from 'react';
import { getRoot, Instance } from 'mobx-state-tree';
import { Obj } from 'utils';
import { Root } from './Root';

const initState = Obj.keysReduce(Root.properties, (acc, k) => {
  const value = Root.properties[k];
  acc[k] = ('_defaultValue' in value) ? value._defaultValue : undefined;
  return acc;
}, {});

export const store = Root.create(initState);

export const storeContext = createContext<Instance<typeof Root> | null>(null);

/** Возвращает типизированный store */
export const getTypeRoot = (self: any) => getRoot<typeof Root>(self);

export const useMst = () => {
  const store = useContext(storeContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};