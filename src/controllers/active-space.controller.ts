import { NEW_PAGE_ID, UserDataLabels } from '../constants';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActiveSpaceModel } from '../models/active-space.model';
import { UserModel } from '../models/user.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';
import { UpdatedData } from '../types/user.types';

export type NewPage = {
  newPageTitle: string,
  spacePathname: string,
};

export type DeletePage = {
  pageID: string,
  spacePathname: string,
  callback: Function,
};

export const activeSpaceController: Controller = new EventEmitter();

activeSpaceController
  .on(ActiveSpaceEvents.OPEN_SPACE, openSpaceHandler)
  .on(ActiveSpaceEvents.CLOSE_SPACE, closeSpaceHandler)
  .on(ActiveSpaceEvents.SET_ACTIVE_PAGE, setActivePageHandler)
  .on(ActiveSpaceEvents.ADD_PAGE, addPageHandler)
  .on(ActiveSpaceEvents.DELETE_PAGE, deletePageHandler);

async function openSpaceHandler(spacePathname: string): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  await activeSpaceModel.openSpace(spacePathname);
}

function closeSpaceHandler(): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.closeSpace();
}

function setActivePageHandler(pageID: string): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.setActiveSpaceID(pageID);
}

async function addPageHandler({newPageTitle, spacePathname}: NewPage): Promise<void> {
  updateSpacePages((spacePageIDs: string[]) => {
    return [...spacePageIDs, NEW_PAGE_ID];
  });

  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  const newPageID: string = await activeSpaceModel.createPage(newPageTitle, spacePathname);

  updateSpacePages((spacePageIDs: string[]) => {
    return spacePageIDs.map((pageID) => {
      return pageID === NEW_PAGE_ID ? newPageID : pageID;
    });
  });
}

async function deletePageHandler({pageID, spacePathname, callback}: DeletePage): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  const deleted: boolean = await activeSpaceModel.deletePage(pageID, spacePathname);

  if (deleted) {
    updateSpacePages((spacePageIDs: string[]) => {
      return spacePageIDs.filter((id) => id !== pageID);
    });
  }

  callback(deleted);
}

function updateSpacePages(updatingFunction: Function) {
  const userModel: UserModel = new UserModel();
  const spacePageIDs = userModel.getState(UserDataLabels.SPACE_PAGES) as string[];

  const updatedSpacePages: UpdatedData = {
    [UserDataLabels.SPACE_PAGES]: updatingFunction(spacePageIDs),
  };

  userModel.updateStates(updatedSpacePages);
}
