import { Space } from '../../common/entities';

export const initialState: ActiveSpaceStoreState = {
  isOpen: false,
  space: null,
};

export type ActiveSpaceStoreState = {
  isOpen: boolean,
  space: Space | null,
};

export interface ActiveSpaceStore {
  setActiveSpace(space: Space): void;
  removeActiveSpace(): void;
}
