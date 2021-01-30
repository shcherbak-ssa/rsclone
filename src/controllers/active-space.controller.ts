import { Page, UpdatedPage, UpdatedSpace } from '../../common/entities';
import { NEW_PAGE_ID, UserDataLabels } from '../constants';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActiveSpaceModel } from '../models/active-space.model';
import { SpacesModel } from '../models/spaces.model';
import { UserModel } from '../models/user.model';
import { EventEmitter } from '../services/event-emitter.service';
import { ToolsService } from '../services/tools.service';
import { Controller } from '../types/services.types';
import { OpenSpacePathnames } from '../types/tools.types';
import { UpdatedData } from '../types/user.types';

export type OpenSpace = {
  spacePathname: string,
  pagePathname?: string,
};

export type SetActivePage = {
  pageID: string,
  callback: () => void,
};

export type NewPage = {
  newPageTitle: string,
  callback: (pageID: string) => void,
};

export type DeletePage = {
  pageID: string,
  activePage: Page,
  callback: Function,
  changePagePathname: (pageID: string) => void,
};

export const activeSpaceController: Controller = new EventEmitter();

activeSpaceController
  .on(ActiveSpaceEvents.OPEN_SPACE, openSpaceHandler)
  .on(ActiveSpaceEvents.CLOSE_SPACE, closeSpaceHandler)
  .on(ActiveSpaceEvents.SET_ACTIVE_PAGE, setActivePageHandler)
  .on(ActiveSpaceEvents.ADD_PAGE, addPageHandler)
  .on(ActiveSpaceEvents.UPDATE_PAGE, updatePageHandler)
  .on(ActiveSpaceEvents.DELETE_PAGE, deletePageHandler);

/** handlers */
async function openSpaceHandler({spacePathname, pagePathname}: OpenSpace): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  await activeSpaceModel.openSpace(spacePathname, pagePathname);
}

function closeSpaceHandler(): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.closeSpace();
}

function setActivePageHandler({pageID, callback}: SetActivePage): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.setActiveSpaceID(pageID);

  callback();
}

async function addPageHandler({newPageTitle, callback}: NewPage): Promise<void> {
  updateSpacePages((spacePageIDs: string[]) => {
    return [...spacePageIDs, NEW_PAGE_ID];
  });

  const {activeSpaceModel, spacePathname} = getPageActionsAssets();
  const newPageID: string = await activeSpaceModel.createPage(newPageTitle, spacePathname);

  updateSpacePages((spacePageIDs: string[]) => {
    return spacePageIDs.map((pageID) => {
      return pageID === NEW_PAGE_ID ? newPageID : pageID;
    });
  });

  updateLastUpdatedFieldOfActiveSpace(spacePathname);

  callback(newPageID);
}

async function updatePageHandler(updatedPage: UpdatedPage): Promise<void> {
  const {activeSpaceModel, spacePathname} = getPageActionsAssets();
  await activeSpaceModel.updatePage(updatedPage, spacePathname);

  updateLastUpdatedFieldOfActiveSpace(spacePathname);
}

async function deletePageHandler({
  pageID, activePage, callback, changePagePathname,
}: DeletePage): Promise<void> {
  const {activeSpaceModel, spacePathname} = getPageActionsAssets();
  const deleted: boolean = await activeSpaceModel.deletePage(pageID, spacePathname);

  if (deleted) {
    updateSpacePages((spacePageIDs: string[]) => {
      if (activePage.id === pageID) {
        const initialPageID: string = spacePageIDs[0];
        const setActivePagePayload: SetActivePage = {
          pageID: initialPageID,
          callback: () => {
            changePagePathname(initialPageID);
          },
        };

        activeSpaceController.emit(ActiveSpaceEvents.SET_ACTIVE_PAGE, setActivePagePayload);
      }

      return spacePageIDs.filter((id) => id !== pageID);
    });

    updateLastUpdatedFieldOfActiveSpace(spacePathname);
  }

  callback(deleted);
}

/** tools */
function getPageActionsAssets(): {
  spacePathname: string,
  activeSpaceModel: ActiveSpaceModel,
} {
  const spacePathname: string = getOpenSpacePathname();
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();

  return {
    spacePathname,
    activeSpaceModel,
  };
}

function getOpenSpacePathname(): string {
  const toolsService: OpenSpacePathnames = new ToolsService();
  return toolsService.getOpenSpacePathnames().spacePathname;
}

function updateSpacePages(updatingFunction: Function) {
  const userModel: UserModel = new UserModel();
  const spacePageIDs = userModel.getState(UserDataLabels.SPACE_PAGES) as string[];

  const updatedSpacePages: UpdatedData = {
    [UserDataLabels.SPACE_PAGES]: updatingFunction(spacePageIDs),
  };

  userModel.updateStates(updatedSpacePages);
}

function updateLastUpdatedFieldOfActiveSpace(spacePathname: string): void {
  const spacesModel: SpacesModel = new SpacesModel();
  const activeSpaceID: string = spacesModel.getSpaceIDByPathname(spacePathname);

  const updatedSpace: UpdatedSpace = {
    id: activeSpaceID,
    updates: {
      [UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
    },
  };

  spacesModel.updateStoreSpaces(updatedSpace);
}
