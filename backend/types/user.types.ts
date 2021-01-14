import { LanguageLabels, Themes } from '../../common/constants';
import { KeyboardShortcutType } from './keyboard-shortcuts.types';

export type User = {
  fullname: string;
  email: string;
  password: string;
  username: string;
  avatar: boolean;
  language: LanguageLabels;
  theme: Themes;
  shortcuts: Array<KeyboardShortcutType>;
};
