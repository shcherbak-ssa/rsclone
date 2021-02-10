import { PageAccess, PageAccessCreator } from '../types/pages.types';

export class PageAccessService implements PageAccessCreator {
  private pageAccess: PageAccess = {
    userID: '',
    spaceID: '',
    pageID: '',
  };

  setUserID(userID: string): PageAccessService {
    this.pageAccess.userID = userID;
    return this;
  }

  setSpaceID(spaceID: string): PageAccessService {
    this.pageAccess.spaceID = spaceID;
    return this;
  }

  setPageID(pageID: string): PageAccessService {
    this.pageAccess.pageID = pageID;
    return this;
  }

  getPageAccess(): PageAccess {
    return this.pageAccess;
  }
}
