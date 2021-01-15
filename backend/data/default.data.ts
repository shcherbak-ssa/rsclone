import { LanguageLabels, Themes } from '../../common/constants';
import { UserDataLabels } from '../constants';
import { defaultKeyboardShortcuts } from './keyboard-shortcut.data';

export const defaultUserData = {
  [UserDataLabels.AVATAR]: false,
  [UserDataLabels.LANGUAGE]: LanguageLabels.ENGLISH,
  [UserDataLabels.THEME]: Themes.ORIGINAL,
  [UserDataLabels.SHORTCUTS]: defaultKeyboardShortcuts,
};
