import infoIcon from '@iconify/icons-ant-design/info-circle-outlined';
import booksIcon from '@iconify/icons-wpf/books';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import shortcutsIcon from '@iconify/icons-mdi/apple-keyboard-command';

import { ActionIconProps } from '../components/action-icon.component';
import { ActionIconLabels } from '../constants/ui.constants';

export const actionIconData: {[key: string]: ActionIconProps} = {
  [ActionIconLabels.INFO]: {
    icon: infoIcon,
    height: 18,
  },
  [ActionIconLabels.LOGO]: {
    icon: booksIcon,
    width: 20,
    height: 24,
  },
  [ActionIconLabels.SETTINGS]: {
    icon: settingsIcon,
    height: 18,
  },
  [ActionIconLabels.SHORTCUTS]: {
    icon: shortcutsIcon,
    height: 18,
  },
};

export const actionSidebarIconLabels: ActionIconLabels[] = [
  ActionIconLabels.INFO,
  ActionIconLabels.LOGO,
];
