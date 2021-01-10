import {
  StoreDispatch, StoreReducer, StoreStateGetter, StoreStates, StoreType,
} from "./store-types";

export let store: StoreService;

export class StoreService {
  private states: { [key: string]: StoreStates };
  private reducers: Map<string, StoreReducer>;

  constructor() {
    this.states = {};
    this.reducers = new Map();
  }

  static initStore(stores: Array<StoreType> = []) {
    store = new StoreService();
    stores.forEach((newStore: StoreType) => store.addStore(newStore));
  }

  addStore({storeName, reducer}: StoreType) {
    this.states[storeName] = reducer(undefined, {type: ''});
    this.reducers.set(storeName, reducer);
  }

  removeStore(storeName: string) {
    delete this.states[storeName];
    this.reducers.delete(storeName);
  }

  getStates(stateGetter?: StoreStateGetter) {
    if (stateGetter) {
      const {storeName, filter} = stateGetter;
      const currentStates = this.states[storeName];
      return filter ? filter(currentStates) : currentStates;
    }

    return this.states
  }

  dispatchAction(storeDispatch: StoreDispatch) {
    if (storeDispatch.storeName) {
      this.runReducer(storeDispatch);
    } else {
      const {action} = storeDispatch;

      for (const storeName of Object.keys(this.states)) {
        this.runReducer({storeName, action});
      }
    }
  }

  private runReducer({storeName, action}: StoreDispatch) {
    const currentStates = this.states[storeName];
    const currentReducer = this.reducers.get(storeName);

    const updatedState = currentReducer(currentStates, action);
    this.states[storeName] = updatedState;
  }
}

export class Store {
  protected storeName: string;

  protected getStoreDispatch(type: string, payload: any = {}): StoreDispatch {
    return {
      storeName: this.storeName,
      action: { type, payload },
    };
  }
}
