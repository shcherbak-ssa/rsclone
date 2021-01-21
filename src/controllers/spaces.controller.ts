import { NewSpace, UpdatedSpace } from '../../common/entities';
import { UserDataLabels } from '../constants';
import { SpacesEvents, UserDraftEvents } from '../constants/events.constants';
import { spacesDataLabels } from '../data/spaces.data';
import { SpacesModel } from '../models/spaces.model';
import { UserDraftModel } from '../models/user-draft.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';
import { UserDraftStoreState } from '../types/user-draft.types';
import { userDraftController } from './user-draft.controller';

export const spacesController: Controller = new EventEmitter();

export type UpdatedSpaceData = {
  updatedData: {[key: string]: string},
  callback: Function,
};

spacesController
  .on(SpacesEvents.CREATE_SPACE, createSpaceHandler)
  .on(SpacesEvents.UPDATE_SPACE, updateSpaceHandler)
  .on(SpacesEvents.DELETE_SPACE, deleteSpaceHandler);

async function createSpaceHandler(callback: Function): Promise<void> {
  const newSpaceDataLabels: UserDataLabels[] = [
    UserDataLabels.SPACE_NAME,
    UserDataLabels.SPACE_COLOR,
    UserDataLabels.SPACE_LOGO,
  ];

  const userDraftModel: UserDraftModel = new UserDraftModel();
  const newSpace: UserDraftStoreState = userDraftModel.getDraftValues(newSpaceDataLabels);

  const spacesModel: SpacesModel = new SpacesModel();
  const isCreatedSuccess: boolean = await spacesModel.createSpace(newSpace as NewSpace);

  if (isCreatedSuccess) {
    userDraftController.emit(UserDraftEvents.RESET_STATES, newSpaceDataLabels);
  }

  callback(isCreatedSuccess)
}

async function updateSpaceHandler({updatedData, callback}: UpdatedSpaceData): Promise<void> {
  const userDraftModel: UserDraftModel = new UserDraftModel();
  const spaceID = userDraftModel.getDraftState(UserDataLabels.SPACE_ID) as string;
  
  const updatedSpace: UpdatedSpace = {
    id: spaceID,
    updates: { ...updatedData },
  };

  const spacesModel: SpacesModel = new SpacesModel();
  const updatingResult: boolean = await spacesModel.updateSpace(updatedSpace);

  if (updatingResult) {
    userDraftController.emit(UserDraftEvents.RESET_STATES, spacesDataLabels);
  }
  
  callback(updatingResult);
}

async function deleteSpaceHandler(callback: Function) {
  const userDraftModel: UserDraftModel = new UserDraftModel();
  const deletedSpaceID = userDraftModel.getDraftState(UserDataLabels.SPACE_ID) as string;
  
  const spacesModel: SpacesModel = new SpacesModel();
  const deletionResult: boolean = await spacesModel.deleteSpace(deletedSpaceID);

  if (deletionResult) {
    userDraftController.emit(UserDraftEvents.RESET_STATES, spacesDataLabels);
  }
  
  callback(deletionResult);
}
