import { Reducer, AnyAction, combineReducers, createStore, Store } from 'redux';

export let storeService: StoreService;

export class StoreService {
  store: Store;
  private reducers: { [key: string]: Reducer<any, AnyAction> } = {};
  private combinedReducers: Reducer<any, AnyAction> = combineReducers({});
  private deletedReducerNames: Array<string> = [];

  static createStore() {
    storeService = new StoreService();

    const store: Store = createStore(storeService.reduce.bind(storeService));
    storeService.store = store;

    return store;
  }

  reduce(state: any, action: AnyAction) {
    const updatedState = {...state};
    this.removeDeletedReducersFromState(updatedState);

    return this.combinedReducers(updatedState, action);
  }

  addReducer(reducerName: string, reducer: Reducer<any, AnyAction>) {
    if (!reducerName || this.reducers[reducerName]) return;

    this.reducers[reducerName] = reducer;
    this.updateCombinedReducers();
    this.dispatchAction({type: 'action'});
  }

  deleteReducer(reducerName: string) {
    if (!reducerName || !this.reducers[reducerName]) return;

    delete this.reducers[reducerName];
    this.deletedReducerNames.push(reducerName);

    this.updateCombinedReducers();
  }

  dispatchAction(action: AnyAction) {
    this.store.dispatch(action);
  }

  private removeDeletedReducersFromState(state: any) {
    this.deletedReducerNames.forEach((deletedReducerName) => {
      delete state[deletedReducerName];
    });

    this.deletedReducerNames = [];
  }

  private updateCombinedReducers() {
    this.combinedReducers = combineReducers(this.reducers);
  }

}
