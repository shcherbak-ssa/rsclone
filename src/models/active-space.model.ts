import { Page, Space } from '../../common/entities';
import { Stores } from '../constants';
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
  
  async openSpace(spacePathname: string) {
    try {
      this.activeSpaceStore.setIsOpen(true);

      const spacePagesRequest: Request = this.createSpacePagesRequest(spacePathname);
      const response: Response = await this.requestSender.send(spacePagesRequest).get();

      const {pages}: {pages: Page[]} = response.parseResponse();
      this.activeSpaceStore.openSpace(pages);
    } catch (error) {
      console.log(error);
    }
  }

  closeSpace() {
    this.activeSpaceStore.closeSpace();
  }

  setActiveSpaceID(pageID: string) {
    const pages: Page[] = this.activeSpaceStore.getPages();
    const activePage: Page = pages.find((page) => page.id === pageID);
    this.activeSpaceStore.setActivePage(activePage);
  }

  async createPage(newPageTitle: string, spacePathname: string): Promise<string> {
    try {
      const createPageRequest: Request = this.createPageCreatingRequest(spacePathname, {newPageTitle});
      const response: Response = await this.requestSender.send(createPageRequest).create();

      const page: Page = response.parseResponse();
      this.activeSpaceStore.addPage(page);

      const spaces: Space[] = this.spacesStore.getSpaces();
      const updatedSpaces: Space[] = spaces.map((space) => {
        if (space.pathname === spacePathname) {
          space.pages.push(page.id);
        }

        return space;
      });

      this.spacesStore.updateSpaces(updatedSpaces);

      return page.id;
    } catch (error) {
      console.log(error);
    }
  }

  private createSpacePagesRequest(spacePathname: string): Request {
    const spacePagesPathname: string = this.urlPathname.getPagesPathname(spacePathname);

    return this.requestCreator
      .appendUrlPathname(spacePagesPathname)
      .createRequest();
  }

  private createPageCreatingRequest(spacePathname: string, body: any): Request {
    const spacePagesPathname: string = this.urlPathname.getPagesPathname(spacePathname);

    return this.requestCreator
      .appendUrlPathname(spacePagesPathname)
      .setBody(body)
      .createRequest();
  }
}
