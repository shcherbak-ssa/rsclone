import { store } from './store';

export const storeStates = {
  getActiveMenuItem() {
    return store.getState().app.activeMenuItem;
  },
};
