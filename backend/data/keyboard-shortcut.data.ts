import { ShortcurtsSections, ShortcutsLabels } from '../../common/constants';
import { KeyboardShortcutType } from '../types/user.types';

export const defaultKeyboardShortcuts: KeyboardShortcutType[] = [
  {
    section: ShortcurtsSections.HOMEPAGE,
    keys: 'ctrl+alt+s',
    label: ShortcutsLabels.ADD_SPACE,
  },
  {
    section: ShortcurtsSections.SPACE,
    keys: 'ctrl+alt+p',
    label: ShortcutsLabels.ADD_PAGE,
  },
  {
    section: ShortcurtsSections.SPACE,
    keys: 'ctrl+alt+s',
    label: ShortcutsLabels.ADD_SECTION,
  },
];
