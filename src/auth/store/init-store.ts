import { combineReducers, createStore, Store } from "redux";
import { InputsActionType, InputsStateType, inputsStore } from "./inputs.store";

type StoreStateType = {
  inputs: InputsStateType,
};

type StoreActionType = InputsActionType;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({
  inputs: inputsStore.reducer
}));

export function dispatchAction(action: StoreActionType) {
  store.dispatch(action);
}
