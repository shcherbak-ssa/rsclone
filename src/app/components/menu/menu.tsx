import React from 'react';
import './menu.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';
import { MenuItem } from '../menu-item';

export function Menu() {
  const menuItemsProps = {
    spaces: {
      icon: spacesIcon,
      text: 'Spaces',
    },
    settings: {
      icon: settingsIcon,
      text: 'Settings',
    },
    logout: {
      icon: logOutIcon,
      text: 'Log out',
    },
  };

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
