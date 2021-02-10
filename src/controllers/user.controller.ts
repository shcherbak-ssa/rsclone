import { Controller } from '../types/services.types';
import { EventEmitter } from '../services/event-emitter.service';
import { UserModel } from '../models/user.model';
import { LanguageEvents, UserEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { UserDeleteModel } from '../models/user-delete.model';
import { UpdatedData } from '../types/user.types';
import { UserUpdateModel } from '../models/user-update.model';
import { languageController } from './language.controller';
import { Space } from '../../common/entities';

export type UpdateUserData = {
  updatedData: UpdatedData,
  callback: Function,
};

export type ActiveSpace = {
  space: Space,
  callback: Function,
};

export const userController: Controller = new EventEmitter();

userController
  .on(UserEvents.UPDATE_STATES, updatedStatesHandler)
  .on(UserEvents.SYNC_DRAFT, syncDraftHandler)
  .on(UserEvents.SET_ACTIVE_SPACE, setActiveSpaceHandler)
  .on(UserEvents.UPDATE_USER, updateUserHandler)
  .on(UserEvents.DELETE_USER, deleteUserHandler);

function updatedStatesHandler(updatedStates: UpdatedData) {
  const userModel: UserModel = new UserModel();
  userModel.updateStates(updatedStates);
}

function syncDraftHandler() {
  const userModel: UserModel = new UserModel();
  userModel.syncDraft();
}

function setActiveSpaceHandler({space, callback}: ActiveSpace) {
  const userModel: UserModel = new UserModel();
  userModel.setActiveSpace(space);
  userModel.syncDraft();

  callback();
}

async function updateUserHandler({updatedData, callback}: UpdateUserData) {
  const userUpdateModel: UserUpdateModel = new UserUpdateModel();
  const result: boolean = await userUpdateModel.updateUser(updatedData);

  if (UserDataLabels.LANGUAGE in updatedData) {
    languageController.emit(
      LanguageEvents.CHANGE_LANGUAGE,
      {
        nextLanguage: updatedData[UserDataLabels.LANGUAGE],
        callback: () => {
          callback(result);
        },
      }
    );
  } else {
    callback(result);
  }
}

async function deleteUserHandler(callback: Function) {
  const userDeleteModel: UserDeleteModel = new UserDeleteModel();
  const deleted: boolean = await userDeleteModel.deleteUser();

  callback(deleted);
}
