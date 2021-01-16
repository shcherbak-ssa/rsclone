import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { UserModel } from '../models/user.model';
import { UserEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { UserDeleteModel } from '../models/user-delete.model';
import { UpdatedData } from '../types/user.types';
import { UserUpdateModel } from '../models/user-update.model';

export type UpdateUserData = {
  updatedData: UpdatedData,
  callback: Function,
};

export const userController: Controller = new EventEmitter();

userController
  .on(UserEvents.UPDATE_STATES, updatedStatesHandler)
  .on(UserEvents.UPDATE_USER, updatedUserHandler)
  .on(UserEvents.DELETE_USER, deleteUserHandler);

function updatedStatesHandler(updatedStateLabels: UserDataLabels[]) {
  const userModel: UserModel = new UserModel();
  userModel.updateState(updatedStateLabels);
}

async function updatedUserHandler({updatedData, callback}: UpdateUserData) {
  const userUpdateModel: UserUpdateModel = new UserUpdateModel();
  await userUpdateModel.updateUser(updatedData);

  callback();
}

async function deleteUserHandler(callback: Function) {
  const userDeleteModel: UserDeleteModel = new UserDeleteModel();
  const deleted: boolean = await userDeleteModel.deleteUser();

  callback(deleted);
}
