import { Space } from '../../common/entities';

export const initialState: SpacesStoreState = [];

export type SpacesStoreState = Space[];

export interface SpacesStore {
  getSpaces(): Space[];
  setSpaces(spaces: Space[]): void;
  addSpace(space: Space): void;
  deleteSpace(spaces: Space[]): void;
};
