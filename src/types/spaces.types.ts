import { Space } from '../../common/entities';

export const initialState: SpacesStoreState = [];

export type SpacesStoreState = Space[];

export interface SpacesStore {
  getSpaceByPathname(spacePathname: string): Space;
  getSpaces(): Space[];
  setSpaces(spaces: Space[]): void;
  addSpace(space: Space): void;
  updateSpaces(spaces: Space[]): void;
};
