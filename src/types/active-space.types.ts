import { Page } from '../../common/entities';

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
  setIsOpen(isOpen: boolean): void;
  openSpace(pages: Page[]): void;
  closeSpace(): void;
  addPage(page: Page): void;
  setActivePage(page: Page): void;
}
