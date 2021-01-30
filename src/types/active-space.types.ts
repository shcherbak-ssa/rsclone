import { Page, PageNode } from '../../common/entities';

export const initialState: ActiveSpaceStoreState = {
  isOpen: false,
  activePage: null,
  pages: [],
};

export type ActiveSpaceStoreState = {
  isOpen: boolean,
  activePage: Page | null,
  pages: Page[]
};

export interface ActiveSpaceStore {
  getPages(): Page[];
  getActivePage(): Page;
  setIsOpen(isOpen: boolean): void;
  openSpace(pages: Page[], activePage: Page | null): void;
  closeSpace(): void;
  addPage(page: Page): void;
  setActivePage(page: Page): void;
  updateActivePage(activePage: Page, pages: Page[]): void;
  deletePage(pages: Page[]): void;
}
