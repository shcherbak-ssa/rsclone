import { Space, NewSpace } from '../../common/entities';
import { Stores } from '../constants';
import { StoreManagerService } from '../services/store-manager.service';
import { Request, RequestCreator, Response } from '../types/services.types';
import { SpacesStore } from '../types/spaces.types';
import { StoreManager } from '../types/store.types';
import { SpacesValidationImpl } from '../validation/spaces.validation';
import { BaseDraftModel } from './base.model';

export interface SpacesValidation {
  validateCreatedSpace(newSpace: NewSpace): Promise<NewSpace>;
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

  async createSpace(newSpace: NewSpace): Promise<boolean> {
    try {
      newSpace = await this.validation.validateCreatedSpace(newSpace);

      const request: Request = this.createRequestWithBody(newSpace);
      const response: Response = await this.requestSender.send(request).create();

      const createdSpace: Space = response.parseResponse();
      this.getSpacesStore().addSpace(createdSpace);

      return true;
    } catch (error) {
      console.dir(error);
      this.parseError(error);
      return false;
    }
  }

  private getSpacesStore(): SpacesStore {
    return this.storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
  }

  private createRequestWithBody(space: any): Request {
    return this.addSpacesPathnameToRequest()
      .setBody(space)
      .createRequest();
  }

  private addSpacesPathnameToRequest(): RequestCreator {
    const spacesPathname: string = this.urlPathname.getSpacesPathname();
    return this.requestCreator.appendUrlPathname(spacesPathname);
  }
}
