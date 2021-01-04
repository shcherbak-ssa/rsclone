import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './menu.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { MenuItem } from '../menu-item';
import { AppEvents, AppRoutes, MenuItemLabels } from '../../constants';
import { storeSelectors } from '../../store';
import { appController } from '../../controllers/app.controller';

export function Menu() {
  const history = useHistory();
  const activeMenuItem = useSelector(storeSelectors.getActiveMenuItem());

  const menuItemsProps = {
    spaces: {
      icon: spacesIcon,
      text: 'Spaces',
      isActive: activeMenuItem === MenuItemLabels.SPACES,
      clickHandler: () => {
        emitChangeMenuItemEvent(MenuItemLabels.SPACES);
        history.push(AppRoutes.ROOT);
      },
    },
    settings: {
      icon: settingsIcon,
      text: 'Settings',
      isActive: activeMenuItem === MenuItemLabels.SETTINGS,
      clickHandler: () => {
        emitChangeMenuItemEvent(MenuItemLabels.SETTINGS);
        history.push(AppRoutes.SETTINGS);
      },
    },
    logout: {
      icon: logOutIcon,
      text: 'Log out',
      clickHandler: () => {},
    },
  };

  function emitChangeMenuItemEvent(nextMenuItem: MenuItemLabels) {
    appController.emit(AppEvents.CHANGE_MENU_ITEM, nextMenuItem);
  }

  return (
    <div className="menu" data-class="flex-column">
      <div className="menu-user"></div>
      <MenuItem {...menuItemsProps.spaces} />
      <MenuItem {...menuItemsProps.settings} />
      <div className="menu-line"></div>
      <MenuItem {...menuItemsProps.logout} />
    </div>
  );
}
