export const initialState: ActiveSpaceStoreState = {
  isOpen: false,
};

export type ActiveSpaceStoreState = {
  isOpen: boolean,
};

export interface ActiveSpaceStore {
  setIsOpen(isOpen: boolean): void;
}
