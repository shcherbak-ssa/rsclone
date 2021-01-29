import { Cursor } from 'mongodb';

import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { PagesDatabase } from '../models/pages.model';
import { NewPage, PageAccess } from '../types/pages.types';
import { Page } from '../../common/entities';

export class PagesCollectionDatabase implements PagesDatabase {
  private async getUserPagesCollection(
    userID: string, spaceID: string,
  ): Promise<DatabaseCollectionService> {
    return DatabaseDBService.createDatabase(userID).createCollection(spaceID);
  }

  async getPages(userID: string, spaceID: string): Promise<Page[]> {
    const userPagesCollection: DatabaseCollectionService
      = await this.getUserPagesCollection(userID, spaceID);

    const result: Cursor = await userPagesCollection.getDocuments();
    const pages = await result.toArray();
  
    pages.forEach((page) => {
      page.id = page._id;
      delete page._id;
    });

    return pages;
  }

  async createPage({userID, spaceID}: PageAccess, newPage: NewPage): Promise<string> {
    const userPagesCollection: DatabaseCollectionService
      = await this.getUserPagesCollection(userID, spaceID);

    return await userPagesCollection.createDocument({...newPage});
  }
}
