import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { UserModel } from '../models/user.model';
import { UserEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';

export const userController: Controller = new EventEmitter();

userController.on(UserEvents.UPDATE_STATES, updatedStatesHandler);

function updatedStatesHandler(updatedStateLabels: UserDataLabels[]) {
  const userModel: UserModel = new UserModel();
  userModel.updateState(updatedStateLabels);
}
