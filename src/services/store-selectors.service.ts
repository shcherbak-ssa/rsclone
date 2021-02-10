import { Stores } from '../constants';

export type StoreSelectors = {
  [key: string]: (args?: any) => (state: any) => any;
};

export const storeSelectorsService: Map<Stores, StoreSelectors> = new Map();
