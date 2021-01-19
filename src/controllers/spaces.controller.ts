import { NewSpace } from '../../common/entities';
import { UserDataLabels } from '../constants';
import { SpacesEvents } from '../constants/events.constants';
import { SpacesModel } from '../models/spaces.model';
import { UserDraftModel } from '../models/user-draft.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';
import { UserDraftStoreState } from '../types/user-draft.types';

export const spacesController: Controller = new EventEmitter();

spacesController.on(SpacesEvents.CREATE_SPACE, createSpaceHandler);

async function createSpaceHandler(callback: Function): Promise<void> {
  const spaceDataLabels: UserDataLabels[] = [
    UserDataLabels.SPACE_NAME,
    UserDataLabels.SPACE_COLOR,
    UserDataLabels.SPACE_LOGO,
  ];

  const userDraftModel: UserDraftModel = new UserDraftModel();
  const updatedData: UserDraftStoreState = userDraftModel.getDraftValues(spaceDataLabels);

  const spacesModel: SpacesModel = new SpacesModel();
  const isCreatedSuccess: boolean = await spacesModel.createSpace(updatedData as NewSpace);

  if (isCreatedSuccess) {
    userDraftModel.resetStates(spaceDataLabels);
  }

  callback(isCreatedSuccess)
}
