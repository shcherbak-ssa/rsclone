import { SpacesCollectionDatabase } from '../database/spaces-collection.database';
import { CreatedSpace, Space, UpdatedSpace } from '../../common/entities';
import { DeleteDatabase } from '../types/database.types';
import { DatabaseDBService } from '../services/database-db.service';

export interface SpacesDatabase {
  getSpaces(userID: string): Promise<Space[]>;
  createSpace(userID: string, createdSpace: CreatedSpace): Promise<Space>;
  updateSpace(userID: string, updatedSpace: UpdatedSpace): Promise<void>;
  deleteSpace(userID: string, deletedSpaceID: string): Promise<void>;
  getSpaceID(userID: string, spacePathname: string): Promise<string>;
}

export class SpacesModel {
  private database: SpacesDatabase;

  constructor() {
    this.database = new SpacesCollectionDatabase();
  }

  async getSpaces(userID: string): Promise<Space[]> {
    return await this.database.getSpaces(userID);
  }

  async createSpace(userID: string, createdSpace: CreatedSpace): Promise<Space> {
    return await this.database.createSpace(userID, createdSpace);
  }

  async updateSpace(userID: string, updatedSpace: UpdatedSpace): Promise<void> {
    await this.database.updateSpace(userID, updatedSpace);
  }

  async deleteSpace(userID: string, deletedSpaceID: string): Promise<void> {
    await this.database.deleteSpace(userID, deletedSpaceID);

    const userDatabase: DeleteDatabase = DatabaseDBService.createDatabase(userID);
    await userDatabase.deleteCollection(deletedSpaceID);
  }

  async getSpaceID(userID: string, spacePathname: string): Promise<string> {
    return await this.database.getSpaceID(userID, spacePathname);
  }
}
