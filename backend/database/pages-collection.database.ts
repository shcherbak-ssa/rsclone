import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { PagesDatabase } from '../models/pages.model';
import { NewPage, PageAccess } from '../types/pages.types';

export class PagesCollectionDatabase implements PagesDatabase {
  private async getUserPagesCollection(
    userID: string, spaceID: string,
  ): Promise<DatabaseCollectionService> {
    return DatabaseDBService.createDatabase(userID).createCollection(spaceID);
  }

  async createPage({userID, spaceID}: PageAccess, newPage: NewPage): Promise<string> {
    const userPagesCollection: DatabaseCollectionService = await this.getUserPagesCollection(userID, spaceID);
    return await userPagesCollection.createDocument({...newPage});
  }
}
