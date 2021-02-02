import { ShortcurtsSections, ShortcutsLabels } from '../../common/constants';
import { KeyboardShortcut } from '../../common/entities';

export const defaultKeyboardShortcuts: KeyboardShortcut[] = [
  {
    section: ShortcurtsSections.HOMEPAGE,
    keys: 'ctrl+alt+s',
    label: ShortcutsLabels.ADD_SPACE,
  },
];
