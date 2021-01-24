import { PageAccess, PageAccessCreator } from '../types/pages.types';

export class PageAccessService implements PageAccessCreator {
  private pageAccess: PageAccess = {
    userID: '',
    spaceID: '',
    pageID: '',
  };

  setUserID(userID: string): void {
    this.pageAccess.userID = userID;
  }

  setSpaceID(spaceID: string): void {
    this.pageAccess.spaceID = spaceID;
  }

  setPageID(pageID: string): void {
    this.pageAccess.pageID = pageID;
  }

  getPageAccess(): PageAccess {
    return this.pageAccess;
  }
}
