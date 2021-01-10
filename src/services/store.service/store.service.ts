import {
  StoreDispatch, StoreReducer, StoreStateGetter, StoreStates, StoreType,
} from "./store-types";

export let store: StoreService;

export class StoreService {
  private states: Map<string, StoreStates>;
  private reducers: Map<string, StoreReducer>;

  constructor() {
    this.states = new Map();
    this.reducers = new Map();
  }

  static initStore(stores: Array<StoreType> = []) {
    store = new StoreService();
    stores.forEach((newStore: StoreType) => store.addStore(newStore));
  }

  addStore({storeName, states, reducer}: StoreType) {
    this.states.set(storeName, states);
    this.reducers.set(storeName, reducer);
  }

  removeStore(storeName: string) {
    this.states.delete(storeName);
    this.reducers.delete(storeName);
  }

  getStates(stateGetter?: StoreStateGetter) {
    if (stateGetter) {
      const {storeName, filter} = stateGetter;
      const currentStates = this.states.get(storeName);
      return filter ? filter(currentStates) : currentStates;
    }

    return this.states
  }

  dispatchAction(storeDispatch: StoreDispatch) {
    if (storeDispatch.storeName) {
      this.runReducer(storeDispatch);
    } else {
      const {action} = storeDispatch;

      for (const storeName of this.states.keys()) {
        this.runReducer({storeName, action});
      }
    }
  }

  private runReducer({storeName, action}: StoreDispatch) {
    const currentStates = this.states.get(storeName);
    const currentReducer = this.reducers.get(storeName);
    currentReducer(currentStates, action);
  }
}
