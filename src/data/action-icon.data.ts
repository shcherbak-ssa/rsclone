import infoIcon from '@iconify/icons-ant-design/info-circle-outlined';
import booksIcon from '@iconify/icons-wpf/books';
import settingsIcon from '@iconify/icons-clarity/settings-line';

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
};
