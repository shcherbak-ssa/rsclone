import { SpacesCollectionDatabase } from '../database/spaces-collection.database';
import { NewSpace, Space, UpdatedSpace } from '../../common/entities';

export interface SpacesDatabase {
  getSpaces(userID: string): Promise<Space[]>;
  createSpace(userID: string, newSpace: NewSpace): Promise<Space>;
  // updateSpace(userID: string, updatedSpace: UpdatedSpace): Promise<UpdatedSpace>;
  deleteSpace(userID: string, deletedSpaceID: string): Promise<void>;
}

export class SpacesModel {
  private database: SpacesDatabase;

  constructor() {
    this.database = new SpacesCollectionDatabase();
  }

  async getSpaces(userID: string): Promise<Space[]> {
    return await this.database.getSpaces(userID);
  }

  async createSpace(userID: string, newSpace: NewSpace): Promise<Space> {
    return await this.database.createSpace(userID, newSpace);
  }

  async deleteSpace(userID: string, deletedSpaceID: string): Promise<void> {
    await this.database.deleteSpace(userID, deletedSpaceID);
  }
}
