import { Space } from '../../common/entities';

export const initialState: SpacesStoreState = [];

export type SpacesStoreState = Space[];

export interface SpacesStore {
  setSpaces(spaces: Space[]): void;
  addSpace(space: Space): void;
};
