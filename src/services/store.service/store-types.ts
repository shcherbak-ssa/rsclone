export type StoreStates = {
  [key: string]: any;
};

export type StoreAction = {
  type: string;
  payload?: any;
};

export type StoreDispatch = {
  storeName?: string;
  action: StoreAction;
};

export type StoreReducer = (state: StoreStates, action: StoreAction) => StoreStates;

export type StoreType = {
  storeName: string;
  states: StoreStates;
  reducer: StoreReducer;
};

export type StoreStateGetter = {
  storeName: string;
  filter?: (store: StoreStates) => any;
};
