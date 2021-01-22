import { Space, NewSpace, UpdatedSpace } from '../../common/entities';
import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { Request, RequestCreator, Response } from '../types/services.types';
import { SpacesStore } from '../types/spaces.types';
import { StoreManager } from '../types/store.types';
import { SpacesValidationImpl } from '../validation/spaces.validation';
import { BaseDraftModel } from './base.model';

export interface SpacesValidation {
  validateCreatedSpace(newSpace: NewSpace): Promise<NewSpace>;
  validateUpdatedSpace(updatedSpace: UpdatedSpace): Promise<UpdatedSpace>;
};

export class SpacesModel extends BaseDraftModel {
  private storeManager: StoreManager;
  private validation: SpacesValidation;

  constructor() {
    super();

    this.storeManager = new StoreManagerService();
    this.validation = new SpacesValidationImpl();
  }

  async setSpaces(spaces: Space[]): Promise<void> {
    await this.storeManager.addStore(Stores.SPACES_STORE);
    this.getSpacesStore().setSpaces(spaces);
  }

  async createSpace(newSpace: NewSpace): Promise<Space | null> {
    try {
      newSpace = await this.validation.validateCreatedSpace(newSpace);

      const request: Request = this.createRequestWithBody(newSpace);
      const response: Response = await this.requestSender.send(request).create();

      const createdSpace: Space = response.parseResponse();
      this.getSpacesStore().addSpace(createdSpace);

      return createdSpace;
    } catch (error) {
      this.parseError(error);
      return null;
    }
  }

  async updateSpace(updatedSpace: UpdatedSpace): Promise<boolean> {
    try {
      updatedSpace = await this.validation.validateUpdatedSpace(updatedSpace);

      const request: Request = this.createRequestWithBody(updatedSpace);
      const response: Response = await this.requestSender.send(request).update();
      updatedSpace = response.parseResponse();

      const spacesStore: SpacesStore = this.getSpacesStore();
      const spaces: Space[] = spacesStore.getSpaces();
      const updatedSpaces: Space[] = spaces.map((space) => {
        return space.id === updatedSpace.id ? {...space, ...updatedSpace.updates} : space;
      });

      spacesStore.updateSpaces(updatedSpaces);
      return true;
    } catch (error) {
      this.parseError(error);
      return false;
    }
  }

  async deleteSpace(deletedSpaceID: string): Promise<boolean> {
    try {
      const request: Request = this.createRequestWithBody({deletedSpaceID});
      const response: Response = await this.requestSender.send(request).delete();
      deletedSpaceID = response.parseResponse().deletedSpaceID;

      const spacesStore: SpacesStore = this.getSpacesStore();
      const spaces: Space[] = spacesStore.getSpaces();
      const updatedSpaces: Space[] = spaces.filter((space) => space.id !== deletedSpaceID);

      spacesStore.updateSpaces(updatedSpaces);
      return true;
    } catch (error) {
      this.parseError(error); 
      return false;
    }
  }

  private getSpacesStore(): SpacesStore {
    return this.storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
  }

  private createRequestWithBody(body: any): Request {
    return this.addSpacesPathnameToRequest()
      .setBody(body)
      .createRequest();
  }

  private addSpacesPathnameToRequest(): RequestCreator {
    const spacesPathname: string = this.urlPathname.getSpacesPathname();
    return this.requestCreator.appendUrlPathname(spacesPathname);
  }
}
