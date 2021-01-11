import { UserDataLabels, UserInputsEvents } from '../constants';
import { Controller } from '../types/controller.types';
import { SetError, UpdateInput } from '../types/input.types';

import { UserInputsModel } from '../models/user-inputs.model';
import { EventEmitter } from '../services/event-emitter.service';

export const userInputsController: Controller = new EventEmitter();

let userInputsModel: UserInputsModel | null = null;

userInputsController.on(UserInputsEvents.INIT_EVENTS, initUserInputsEventsHandler);

function initUserInputsEventsHandler() {
  userInputsModel = new UserInputsModel();

  userInputsController
    .off(UserInputsEvents.INIT_EVENTS, initUserInputsEventsHandler)
    .on(UserInputsEvents.UPDATE_INPUT_VALUE, updateInputValueHandler)
    .on(UserInputsEvents.SET_INPUT_ERROR, setInputErrorHandler)
    .on(UserInputsEvents.RESET_STATES, resetStatesHandler)
    .on(UserInputsEvents.ADD_INPUTS, addInputsHandler)
    .on(UserInputsEvents.REMOVE_EVENTS, removeUserInputsEventsHandler);
}

function removeUserInputsEventsHandler() {
  userInputsModel = null;

  userInputsController
    .on(UserInputsEvents.INIT_EVENTS, initUserInputsEventsHandler)
    .off(UserInputsEvents.UPDATE_INPUT_VALUE, updateInputValueHandler)
    .off(UserInputsEvents.SET_INPUT_ERROR, setInputErrorHandler)
    .off(UserInputsEvents.RESET_STATES, resetStatesHandler)
    .off(UserInputsEvents.ADD_INPUTS, addInputsHandler)
    .off(UserInputsEvents.REMOVE_EVENTS, removeUserInputsEventsHandler);
}

function updateInputValueHandler({value, inputLabel}: UpdateInput) {
  userInputsModel.updateInputValue(value, inputLabel);
}

function setInputErrorHandler({error, inputLabel}: SetError) {
  userInputsModel.setInputError(error, inputLabel);
}

function resetStatesHandler() {
  userInputsModel.resetStates();
}

function addInputsHandler(inputNames: UserDataLabels[]) {
  userInputsModel.addInputs(inputNames);
}
