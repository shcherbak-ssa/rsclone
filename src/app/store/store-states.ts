import { store } from './store';
import { ShortcutsLabels } from '../../../core/constants';

export const storeStates = {
  getAddSpaceKeyboardShortcut() {
    return store.getState().user.keyboardShortcuts.find((keyboardShortcut) => {
      return keyboardShortcut.label === ShortcutsLabels.ADD_SPACE;
    });
  },
};
