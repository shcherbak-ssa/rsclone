export interface PageAccessCreator {
  setUserID(userID: string): PageAccessCreator;
  setSpaceID(spaceID: string): PageAccessCreator;
  setPageID(pageID: string): PageAccessCreator;
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
  nodes: string,
};
