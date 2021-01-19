import { Cursor } from 'mongodb';

import { DatabaseCollectionService } from '../services/database-collection.service';
import { SpacesDatabase } from '../models/spaces.model';
import { DatabaseDBService } from '../services/database-db.service';
import { CollectionNames } from '../constants';
import { Space } from '../../common/entities';

export class SpacesCollectionDatabase implements SpacesDatabase {
  async getSpaces(userID: string): Promise<Space[]> {
    const userSpacesCollection: DatabaseCollectionService = await this.getUserSpacesCollection(userID);
    const result: Cursor = await userSpacesCollection.getDocuments();

    return result.toArray();
  }

  private async getUserSpacesCollection(userID: string): Promise<DatabaseCollectionService> {
    return DatabaseDBService.createDatabase(userID).createCollection(CollectionNames.SPACES);
  }
}
