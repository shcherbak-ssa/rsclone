import { UserInputsEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { Controller } from '../types/services.types';
import { UserInputsModel } from '../models/user-inputs.model';
import { EventEmitter } from '../services/event-emitter.service';

export const userInputsController: Controller = new EventEmitter();

export type UpdatedInputValue = {
  value: string;
  dataLabel: UserDataLabels;
}

export type UpdatedInputError = {
  error: string;
  dataLabel: UserDataLabels;
}

let userInputsModel: UserInputsModel | null = null;

userInputsController.on(UserInputsEvents.INIT_EVENTS, initUserInputsEventsHandler);

function initUserInputsEventsHandler() {
  userInputsModel = new UserInputsModel();

  userInputsController
    .off(UserInputsEvents.INIT_EVENTS, initUserInputsEventsHandler)
    .on(UserInputsEvents.UPDATE_INPUT_VALUE, updateInputValueHandler)
    .on(UserInputsEvents.SET_INPUT_ERROR, setInputErrorHandler)
    .on(UserInputsEvents.RESET_STATES, resetStatesHandler)
    .on(UserInputsEvents.REMOVE_EVENTS, removeUserInputsEventsHandler);
}

function removeUserInputsEventsHandler() {
  userInputsModel = null;

  userInputsController
    .on(UserInputsEvents.INIT_EVENTS, initUserInputsEventsHandler)
    .off(UserInputsEvents.UPDATE_INPUT_VALUE, updateInputValueHandler)
    .off(UserInputsEvents.SET_INPUT_ERROR, setInputErrorHandler)
    .off(UserInputsEvents.RESET_STATES, resetStatesHandler)
    .off(UserInputsEvents.REMOVE_EVENTS, removeUserInputsEventsHandler);
}

function updateInputValueHandler({value, dataLabel}: UpdatedInputValue) {
  userInputsModel.updateInputValue(value, dataLabel);
}

function setInputErrorHandler({error, dataLabel}: UpdatedInputError) {
  userInputsModel.setInputError(error, dataLabel);
}

function resetStatesHandler() {
  userInputsModel.resetStates();
}
