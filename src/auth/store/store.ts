import { combineReducers, createStore, Store } from 'redux';

import { InputLabels } from '../constants';
import { InputsActionType, InputsStateType, inputsStore } from './inputs.store';
import { ModeActionType, ModeStateType, modeStore } from './mode.store';
import { FormActionType, FormStateType, formStore } from './form.store';

type StoreStateType = {
  inputs: InputsStateType,
  mode: ModeStateType,
  form: FormStateType
};

type StoreActionType = InputsActionType | ModeActionType | FormActionType;

type StoreType = Store<StoreStateType, StoreActionType>;

export const store: StoreType = createStore(combineReducers({
  inputs: inputsStore.reducer,
  mode: modeStore.reducer,
  form: formStore.reducer,
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

  getFormError() {
    return (state: StoreStateType) => state.form.formError;
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
