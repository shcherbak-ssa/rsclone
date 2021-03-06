import { Cursor, ObjectID } from 'mongodb';

import { DatabaseCollectionService } from '../services/database-collection.service';
import { SpacesDatabase } from '../models/spaces.model';
import { DatabaseDBService } from '../services/database-db.service';
import { CollectionNames, UserDataLabels } from '../constants';
import { CreatedSpace, Space, UpdatedSpace } from '../../common/entities';
import { UniqueSpaceDatabase } from '../models/unique.model';

export class SpacesCollectionDatabase implements SpacesDatabase, UniqueSpaceDatabase {
  private async getUserSpacesCollection(userID: string): Promise<DatabaseCollectionService> {
    return DatabaseDBService.createDatabase(userID).createCollection(CollectionNames.SPACES);
  }

  private getSpaceSearchFilter(spaceID: string): {_id: ObjectID} {
    return { _id: new ObjectID(spaceID) };
  }

  // implements SpacesDatabase
  async getSpaces(userID: string): Promise<Space[]> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const result: Cursor = await userSpacesCollection.getDocuments();
    const spaces = await result.toArray();
  
    spaces.forEach((space) => {
      space.id = space._id;
      delete space._id;
    });

    return spaces;
  }

  async createSpace(userID: string, createdSpace: CreatedSpace): Promise<Space> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const createdSpaceID: string = await userSpacesCollection.createDocument({...createdSpace});

    return {
      ...createdSpace,
      [UserDataLabels.SPACE_LAST_UPDATED]: +new Date(),
      id: `${createdSpaceID}`,
    };
  }

  async updateSpace(userID: string, {id, updates}: UpdatedSpace): Promise<void> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const updateSpaceFilter = this.getSpaceSearchFilter(id);
    const updatesOptions = {
      $set: { ...updates },
    };

    await userSpacesCollection.updateDocument(updateSpaceFilter, updatesOptions);
  }

  async deleteSpace(userID: string, deletedSpaceID: string): Promise<void> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const deleteSpaceFilter = this.getSpaceSearchFilter(deletedSpaceID);
    await userSpacesCollection.deleteDocument(deleteSpaceFilter);
  }

  async getSpaceID(userID: string, spacePathname: string): Promise<string> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const getSpaceIDFilter = {
      [UserDataLabels.SPACE_PATHNAME]: spacePathname,
    };
    const getSpaceIDOptions = {
      projection: {
        _id: 1,
      },
    };

    const result = await userSpacesCollection.getDocument(getSpaceIDFilter, getSpaceIDOptions);
    return `${result._id}`;
  }

  async getSpacePageIDs(userID: string, spaceID: string): Promise<string[]> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const getSpacePageIDsFilter = this.getSpaceSearchFilter(spaceID);
    const getSpacePageIDsOptions = {
      projection: {
        [UserDataLabels.SPACE_PAGES]: 1,
      },
    };

    const result = await userSpacesCollection.getDocument(getSpacePageIDsFilter, getSpacePageIDsOptions);
    return result[UserDataLabels.SPACE_PAGES];
  }

  // implements UniqueSpaceDatabase
  async isSpacePathnameUnique(userID: string, spacePathname: string): Promise<boolean> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const uniqueQuery = {
      [UserDataLabels.SPACE_PATHNAME]: spacePathname,
    };

    return await userSpacesCollection.isUnique(uniqueQuery);
  }
}
