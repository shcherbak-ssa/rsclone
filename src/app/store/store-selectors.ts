import { StoreStateType } from './store';

export const storeSelectors = {
  getActiveMenuItem() {
    return (state: StoreStateType) => state.app.activeMenuItem;
  },

  user: {
    get() {
      return (state: StoreStateType) => state.user;
    },

    getCurrentTheme() {
      return (state: StoreStateType) => state.user.theme;
    },
  },
};
