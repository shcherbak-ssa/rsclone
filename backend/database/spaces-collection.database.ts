import { Cursor, ObjectID } from 'mongodb';

import { DatabaseCollectionService } from '../services/database-collection.service';
import { SpacesDatabase } from '../models/spaces.model';
import { DatabaseDBService } from '../services/database-db.service';
import { CollectionNames } from '../constants';
import { NewSpace, Space, UpdatedSpace } from '../../common/entities';

export class SpacesCollectionDatabase implements SpacesDatabase {
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

  async createSpace(userID: string, newSpace: NewSpace): Promise<Space> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const createdSpaceID: string = await userSpacesCollection.createDocument(newSpace);

    delete (newSpace as any)._id;
    return {...newSpace, id: createdSpaceID};
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

  private async getUserSpacesCollection(userID: string): Promise<DatabaseCollectionService> {
    return DatabaseDBService.createDatabase(userID).createCollection(CollectionNames.SPACES);
  }

  private getSpaceSearchFilter(spaceID: string): {_id: ObjectID} {
    return { _id: new ObjectID(spaceID) };
  }
}
