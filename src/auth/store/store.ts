import { combineReducers, createStore, Store } from "redux";
import { InputsActionType, InputsStateType, inputsStore } from "./inputs.store";
import { ModeActionType, ModeStateType, modeStore } from "./mode.store";

type StoreStateType = {
  inputs: InputsStateType,
  mode: ModeStateType,
};

type StoreActionType = InputsActionType | ModeActionType;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({
  inputs: inputsStore.reducer,
  mode: modeStore.reducer,
}));

export function dispatchAction(action: StoreActionType) {
  store.dispatch(action);
}
