import { SpacesCollectionDatabase } from '../database/spaces-collection.database';
import { NewSpace, Space, UpdatedSpace } from '../../common/entities';

export interface SpacesDatabase {
  getSpaces(userID: string): Promise<Space[]>;
  // createSpace(userID: string, newSpace: NewSpace): Promise<Space>;
  // updateSpace(userID: string, updatedSpace: UpdatedSpace): Promise<UpdatedSpace>;
  // deleteSpace(userID: string, spaceID: string): Promise<void>;
}

export class SpacesModel {
  private database: SpacesDatabase;

  constructor() {
    this.database = new SpacesCollectionDatabase();
  }

  async getSpaces(userID: string): Promise<Space[]> {
    return await this.database.getSpaces(userID);
  }
}
