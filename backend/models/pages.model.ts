import { NewPage, PageAccess } from '../types/pages.types';
import { Page } from '../../common/entities';
import { PagesCollectionDatabase } from '../database/pages-collection.database';

export interface PagesDatabase {
  // getPage(pageAccess: PageAccess): Promise<Page>;
  createPage(pageAccess: PageAccess, newPage: NewPage): Promise<string>;
  // updatePage(pageAccess: PageAccess): Promise<boolean>;
  // deletePage(pageAccess: PageAccess): Promise<boolean>;
}

export class PagesModel {
  private database: PagesDatabase;

  constructor() {
    this.database = new PagesCollectionDatabase();
  }

  async createPage(pageAccess: PageAccess, newPage: NewPage): Promise<Page> {
    const pageID: string = await this.database.createPage(pageAccess, newPage);
    return {...newPage, id: `${pageID}`};
  }
}
