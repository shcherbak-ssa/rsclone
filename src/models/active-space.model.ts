import { Page, Space, UpdatedPage } from '../../common/entities';
import { Stores } from '../constants';
import { EMPTY_STRING } from '../constants/strings.constants';
import { StoreManagerService } from '../services/store-manager.service';
import { ActiveSpaceStore } from '../types/active-space.types';
import { Request, Response } from '../types/services.types';
import { SpacesStore } from '../types/spaces.types';
import { StoreManager } from '../types/store.types';
import { BaseModel } from './base.model';

export class ActiveSpaceModel extends BaseModel {
  private activeSpaceStore: ActiveSpaceStore;
  private spacesStore: SpacesStore;

  constructor() {
    super();

    const storeManager: StoreManager = new StoreManagerService();
    this.activeSpaceStore = storeManager.getStore(Stores.ACTIVE_SPACE_STORE) as ActiveSpaceStore;
    this.spacesStore = storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
  }
  
  async openSpace(spacePathname: string, pagePathname?: string) {
    try {
      this.activeSpaceStore.setIsOpen(true);

      const spacePagesRequest: Request = this.createSpacePagesRequest(spacePathname);
      const response: Response = await this.requestSender.send(spacePagesRequest).get();

      const {pages}: {pages: Page[]} = response.parseResponse();
      const activePageID: string
        = pagePathname ? pages.find((page) => page.pathname === pagePathname).id : EMPTY_STRING;

      this.activeSpaceStore.openSpace(pages, activePageID);
    } catch (error) {
      console.log(error);
    }
  }

  closeSpace() {
    this.activeSpaceStore.closeSpace();
  }

  setActiveSpaceID(pageID: string) {
    this.activeSpaceStore.setActivePageID(pageID);
  }

  async createPage(newPageTitle: string, spacePathname: string): Promise<string> {
    try {
      const createPageRequest: Request = this.createRequestWithBody(spacePathname, {newPageTitle});
      const response: Response = await this.requestSender.send(createPageRequest).create();

      const createdPage: Page = response.parseResponse();
      this.activeSpaceStore.addPage(createdPage);

      this.updateSpacePageIDs(spacePathname, (spacePageIDs: string[]) => {
        return [...spacePageIDs, createdPage.id];
      });

      return createdPage.id;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePage(updatedPage: UpdatedPage, spacePathname: string): Promise<void> {
    try {
      const updatedPageRequest: Request = this.createRequestWithBody(spacePathname, updatedPage);
      const response: Response = await this.requestSender.send(updatedPageRequest).update();

      updatedPage = response.parseResponse();

      const updatedPages: Page[] = this.updateSpacePages((pages: Page[]) => {
        return pages.map((page) => {
          return page.id === updatedPage.id ? {...page, ...updatedPage.updates} : page;
        });
      });

      this.activeSpaceStore.updatePages(updatedPages);
    } catch (error) {
      console.log(error);
    }
  }

  async deletePage(deletePageID: string, spacePathname: string): Promise<boolean> {
    try {
      const createPageRequest: Request = this.createRequestWithBody(spacePathname, {deletePageID});
      const response: Response = await this.requestSender.send(createPageRequest).delete();
      response.parseResponse();

      const updatedPages: Page[] = this.updateSpacePages((pages: Page[]) => {
        return pages.filter((page) => page.id !== deletePageID);
      });
      this.activeSpaceStore.deletePage(updatedPages);

      this.updateSpacePageIDs(spacePathname, (spacePageIDs: string[]) => {
        return spacePageIDs.filter((pageID) => pageID !== deletePageID);
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private createSpacePagesRequest(spacePathname: string): Request {
    const spacePagesPathname: string = this.urlPathname.getPagesPathname(spacePathname);

    return this.requestCreator
      .appendUrlPathname(spacePagesPathname)
      .createRequest();
  }

  private createRequestWithBody(spacePathname: string, body: any): Request {
    const spacePagesPathname: string = this.urlPathname.getPagesPathname(spacePathname);

    return this.requestCreator
      .appendUrlPathname(spacePagesPathname)
      .setBody(body)
      .createRequest();
  }

  private updateSpacePageIDs(spacePathname: string, updateFunction: Function): void {
    const spaces: Space[] = this.spacesStore.getSpaces();
    const updatedSpaces: Space[] = spaces.map((space) => {
      if (space.pathname === spacePathname) {
        space.pages = updateFunction(space.pages);
      }

      return space;
    });

    this.spacesStore.updateSpaces(updatedSpaces);
  }

  private updateSpacePages(updateFunction: Function): Page[] {
    const pages: Page[] = this.activeSpaceStore.getPages();
    return updateFunction(pages);
  }
}
