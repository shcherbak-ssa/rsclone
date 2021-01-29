import { NewPage, PageAccess } from '../types/pages.types';
import { Page } from '../../common/entities';
import { PagesCollectionDatabase } from '../database/pages-collection.database';

export interface PagesDatabase {
  getPages(userID: string, spaceID: string): Promise<Page[]>;
  createPage(pageAccess: PageAccess, newPage: NewPage): Promise<string>;
  // updatePage(pageAccess: PageAccess): Promise<boolean>;
  deletePage(pageAccess: PageAccess): Promise<void>;
}

export class PagesModel {
  private database: PagesDatabase;

  constructor() {
    this.database = new PagesCollectionDatabase();
  }

  async getPages(userID: string, spaceID: string): Promise<Page[]> {
    return await this.database.getPages(userID, spaceID);
  }

  async createPage(pageAccess: PageAccess, newPage: NewPage): Promise<Page> {
    const pageID: string = await this.database.createPage(pageAccess, newPage);
    return {...newPage, id: `${pageID}`};
  }

  async deletePage(pageAccess: PageAccess): Promise<void> {
    await this.database.deletePage(pageAccess);
  }
}
