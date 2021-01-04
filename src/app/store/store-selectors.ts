import { StoreStateType } from './store';

export const storeSelectors = {
  getActiveMenuItem() {
    return (state: StoreStateType) => state.app.activeMenuItem;
  },
};
