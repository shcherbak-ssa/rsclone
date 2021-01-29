import { NEW_PAGE_ID, UserDataLabels } from '../constants';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActiveSpaceModel } from '../models/active-space.model';
import { UserModel } from '../models/user.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';
import { UpdatedData } from '../types/user.types';

export type NewPage = {
  newPageTitle: string,
  pages: string[],
  spacePathname: string,
};

export type DeletePage = {
  pageID: string,
  pages: string[],
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

async function addPageHandler({newPageTitle, pages, spacePathname}: NewPage): Promise<void> {
  pages.push(NEW_PAGE_ID);

  const userModel: UserModel = new UserModel();
  let updatedSpacePages: UpdatedData = {
    [UserDataLabels.SPACE_PAGES]: [...pages],
  };

  userModel.updateStates(updatedSpacePages);

  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  const newPageID: string = await activeSpaceModel.createPage(newPageTitle, spacePathname);

  updatedSpacePages = {
    [UserDataLabels.SPACE_PAGES]: pages.map((pageID) => {
      return pageID === NEW_PAGE_ID ? newPageID : pageID;
    }),
  };

  userModel.updateStates(updatedSpacePages);
}

async function deletePageHandler({pageID, pages, spacePathname, callback}: DeletePage): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  const deleted: boolean = await activeSpaceModel.deletePage(pageID, spacePathname);

  if (deleted) {
    const userModel: UserModel = new UserModel();
    const updatedSpacePages: UpdatedData = {
      [UserDataLabels.SPACE_PAGES]: pages.filter((id) => id !== pageID),
    };

    userModel.updateStates(updatedSpacePages);
  }

  callback(deleted);
}
