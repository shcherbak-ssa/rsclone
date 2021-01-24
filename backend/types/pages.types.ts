import { PageNode } from '../../common/entities';

export interface PageAccessCreator {
  setUserID(userID: string): void;
  setSpaceID(spaceID: string): void;
  setPageID(pageID: string): void;
  getPageAccess(): PageAccess;
}

export type PageAccess = {
  userID: string,
  spaceID: string,
  pageID: string,
};

export type NewPage = {
  title: string,
  description: string,
  pathname: string,
  nodes: PageNode[],
};

export type UpdatedPage = {
  
};
