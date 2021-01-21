import { UserDraftEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { Controller } from '../types/services.types';
import { UserDraftModel } from '../models/user-draft.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Space } from '../../common/entities';

export const userDraftController: Controller = new EventEmitter();

export type UpdatedDraftValue = {
  value: string;
  dataLabel: UserDataLabels;
}

export type UpdatedDraftError = {
  error: string;
  dataLabel: UserDataLabels;
}

export type DraftActiveSpace = {
  space: Space,
  callback: Function,
};

let userDraftModel: UserDraftModel | null = null;

userDraftController.on(UserDraftEvents.INIT_EVENTS, initUserInputsEventsHandler);

function initUserInputsEventsHandler(): void {
  userDraftModel = new UserDraftModel();

  userDraftController
    .off(UserDraftEvents.INIT_EVENTS, initUserInputsEventsHandler)
    .on(UserDraftEvents.UPDATE_VALUE, updateValueHandler)
    .on(UserDraftEvents.SET_ERROR, setErrorHandler)
    .on(UserDraftEvents.RESET_STATES, resetStatesHandler)
    .on(UserDraftEvents.SET_ACTIVE_SPACE, setActiveSpaceHandler)
    .on(UserDraftEvents.REMOVE_EVENTS, removeUserInputsEventsHandler);
}

function removeUserInputsEventsHandler(): void {
  userDraftModel = null;

  userDraftController
    .on(UserDraftEvents.INIT_EVENTS, initUserInputsEventsHandler)
    .off(UserDraftEvents.UPDATE_VALUE, updateValueHandler)
    .off(UserDraftEvents.SET_ERROR, setErrorHandler)
    .off(UserDraftEvents.RESET_STATES, resetStatesHandler)
    .off(UserDraftEvents.SET_ACTIVE_SPACE, setActiveSpaceHandler)
    .off(UserDraftEvents.REMOVE_EVENTS, removeUserInputsEventsHandler);
}

function updateValueHandler({value, dataLabel}: UpdatedDraftValue): void {
  userDraftModel.updateValue(value, dataLabel);
}

function setErrorHandler({error, dataLabel}: UpdatedDraftError): void {
  userDraftModel.setError(error, dataLabel);
}

function resetStatesHandler(resetDataLabels: UserDataLabels[]): void {
  userDraftModel.resetStates(resetDataLabels);
}

function setActiveSpaceHandler({space, callback}: DraftActiveSpace): void {
  userDraftModel.setActiveSpace(space);
  callback();
}
