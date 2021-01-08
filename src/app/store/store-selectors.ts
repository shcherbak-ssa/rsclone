import { StoreStateType } from './store';

export const storeSelectors = {
  user: {
    get() {
      return (state: StoreStateType) => state.user;
    },

    getCurrentTheme() {
      return (state: StoreStateType) => state.user.theme;
    },

    getKeyboardShortcuts() {},

    getKeyboardShortcut(shor) {},
  },
};
