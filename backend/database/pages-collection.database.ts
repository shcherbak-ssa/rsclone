import { Cursor, ObjectID } from 'mongodb';

import { DatabaseCollectionService } from '../services/database-collection.service';
import { DatabaseDBService } from '../services/database-db.service';
import { PagesDatabase } from '../models/pages.model';
import { NewPage, PageAccess } from '../types/pages.types';
import { Page } from '../../common/entities';
import { UniquePageDatabase } from '../models/unique.model';
import { UserDataLabels } from '../constants';

export class PagesCollectionDatabase implements PagesDatabase, UniquePageDatabase {
  private async getUserPagesCollection(
    userID: string, spaceID: string,
  ): Promise<DatabaseCollectionService> {
    return DatabaseDBService.createDatabase(userID).createCollection(spaceID);
  }

  private getPageSearchFilter(pageID: string): {_id: ObjectID} {
    return { _id: new ObjectID(pageID) };
  }

  // implements PagesDatabase
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

  async deletePage({userID, spaceID, pageID}: PageAccess): Promise<void> {
    const userPagesCollection: DatabaseCollectionService
      = await this.getUserPagesCollection(userID, spaceID);

    const deletePageFilter = this.getPageSearchFilter(pageID);
    await userPagesCollection.deleteDocument(deletePageFilter);
  }

  // implements UniquePageDatabase
  async isPagePathnameUnique(
    userID: string, spaceID: string, pagePathname: string
  ): Promise<boolean> {
    const userPagesCollection: DatabaseCollectionService
      = await this.getUserPagesCollection(userID, spaceID);
    const uniqueQuery = {
      [UserDataLabels.PAGE_PATHNAME]: pagePathname,
    };

    return await userPagesCollection.isUnique(uniqueQuery);
  }
}
