import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './menu.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { AppRoutes, MenuItemLabels } from '../../constants';
import { storeSelectors } from '../../store';
import { MenuItem } from '../menu-item';
import { Avatar } from '../avatar';

export function Menu() {
  const history = useHistory();
  const [activeMenuItem, setActiveMenuItem] = useState(MenuItemLabels.SPACES);
  const {name: userName} = useSelector(storeSelectors.user.get()); 

  const menuItemsProps = {
    spaces: {
      icon: spacesIcon,
      text: 'Spaces',
      isActive: activeMenuItem === MenuItemLabels.SPACES,
      clickHandler: () => {
        changeMenuItem(MenuItemLabels.SPACES, AppRoutes.ROOT);
      },
    },
    settings: {
      icon: settingsIcon,
      text: 'Settings',
      isActive: activeMenuItem === MenuItemLabels.SETTINGS,
      clickHandler: () => {
        changeMenuItem(MenuItemLabels.SETTINGS, AppRoutes.SETTINGS);
      },
    },
    logout: {
      icon: logOutIcon,
      text: 'Log out',
      clickHandler: () => {},
    },
  };

  function changeMenuItem(nextMenuItemLabel: MenuItemLabels, nextRoute: AppRoutes) {
    if (nextMenuItemLabel === activeMenuItem) return;

    setActiveMenuItem(nextMenuItemLabel);
    history.push(nextRoute);
  }

  return (
    <div className="menu" data-class="flex-column">
      <div className="menu-user">
        <Avatar />
        <div className="menu-username">{userName}</div>
      </div>
      <MenuItem {...menuItemsProps.spaces} />
      <MenuItem {...menuItemsProps.settings} />
      <div className="menu-line"></div>
      <MenuItem {...menuItemsProps.logout} />
    </div>
  );
}
