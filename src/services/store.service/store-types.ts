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
  reducer: StoreReducer;
};

export type StoreStateGetter = {
  storeName: string;
  filter?: (states: StoreStates) => any;
};
