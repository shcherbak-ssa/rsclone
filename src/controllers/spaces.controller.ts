import { NewSpace, Space, UpdatedSpace } from '../../common/entities';
import { UserDataLabels } from '../constants';
import { SpacesEvents } from '../constants/events.constants';
import { SpacesModel } from '../models/spaces.model';
import { UserDraftModel } from '../models/user-draft.model';
import { UserModel } from '../models/user.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';
import { UserDraftStoreState } from '../types/user-draft.types';

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
  const createdSpace: Space | null = await spacesModel.createSpace(newSpace as NewSpace);

  if (createdSpace === null) {
    callback(false);
  } else {
    callback(true, createdSpace);
  }
}

async function updateSpaceHandler({updatedData, callback}: UpdatedSpaceData): Promise<void> {
  const userDraftModel: UserDraftModel = new UserDraftModel();
  const spaceID = userDraftModel.getDraftState(UserDataLabels.SPACE_ID) as string;
  
  const updatedSpace: UpdatedSpace = {
    id: spaceID,
    updates: { ...updatedData },
  };

  const spacesModel: SpacesModel = new SpacesModel();
  const isUpdatedSuccess: boolean = await spacesModel.updateSpace(updatedSpace);

  if (isUpdatedSuccess) {
    const userModel: UserModel = new UserModel();
    userModel.updateStates(updatedData);
  }
  
  callback(isUpdatedSuccess);
}

async function deleteSpaceHandler(callback: Function) {
  const userDraftModel: UserDraftModel = new UserDraftModel();
  const deletedSpaceID = userDraftModel.getDraftState(UserDataLabels.SPACE_ID) as string;
  
  const spacesModel: SpacesModel = new SpacesModel();
  const isDeletedSuccess: boolean = await spacesModel.deleteSpace(deletedSpaceID);
  
  callback(isDeletedSuccess);
}
