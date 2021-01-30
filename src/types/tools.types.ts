import { InputState } from "./user-draft.types";

export interface InitialInputState {
  getInitialInputState(): InputState; 
}

export interface OpenSpacePathnames {
  getOpenSpacePathnames(): {
    spacePathname: string,
    pagePathname: string,
  };
}
