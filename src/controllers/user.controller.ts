import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { UserModel } from '../models/user.model';
import { UserEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { DeleteUserModel } from '../models/delete-user.model';

export const userController: Controller = new EventEmitter();

userController
  .on(UserEvents.UPDATE_STATES, updatedStatesHandler)
  .on(UserEvents.DELETE_USER, deleteUserHandler);

function updatedStatesHandler(updatedStateLabels: UserDataLabels[]) {
  const userModel: UserModel = new UserModel();
  userModel.updateState(updatedStateLabels);
}

async function deleteUserHandler(callback: Function) {
  const deleteUserModel: DeleteUserModel = new DeleteUserModel();
  const deleted: boolean = await deleteUserModel.deleteUser();

  callback(deleted);
}
