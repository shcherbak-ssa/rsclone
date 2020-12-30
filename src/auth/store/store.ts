import { combineReducers, createStore, Store } from 'redux';

import { InputsActionType, InputsStateType, inputsStore } from './inputs.store';
import { ModeActionType, ModeStateType, modeStore } from './mode.store';
import { InputLabels } from '../constants';

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

export const storeSelectors = {
  getCurrentMode() {
    return (state: StoreStateType) => state.mode;
  },

  getInput(inputLabel: InputLabels) {
    return ({ inputs }: StoreStateType) => inputs[inputLabel];
  },
};

export const storeStates = {
  getCurrentMode() {
    return store.getState().mode.currentMode;
  },

  getInputs() {
    return store.getState().inputs;
  },

  getInput(inputLabel: InputLabels) {
    return store.getState().inputs[inputLabel];
  },
};
