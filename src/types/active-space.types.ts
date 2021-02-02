import { Page } from '../../common/entities';
import { EMPTY_STRING } from '../constants/strings.constants';

export const initialState: ActiveSpaceStoreState = {
  isOpen: false,
  activePageID: EMPTY_STRING,
  pages: [],
};

export type ActiveSpaceStoreState = {
  isOpen: boolean,
  activePageID: string,
  pages: Page[]
};

export interface ActiveSpaceStore {
  getPages(): Page[];
  setIsOpen(isOpen: boolean): void;
  openSpace(pages: Page[], activePageID: string): void;
  closeSpace(): void;
  addPage(page: Page): void;
  setActivePageID(activePageID: string): void;
  updatePages(pages: Page[]): void;
  deletePage(pages: Page[]): void;
}
