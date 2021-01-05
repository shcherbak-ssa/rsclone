import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './menu.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { MenuItemLabels } from '../../constants';
import { storeSelectors } from '../../store';
import { AppRoutesService } from '../../../services/app-routes.service';
import { MenuItem } from '../menu-item';
import { Avatar } from '../avatar';

export function Menu() {
  const history = useHistory();
  const {name: userName} = useSelector(storeSelectors.user.get()); 
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const appRoutesService: AppRoutesService = new AppRoutesService();

  const menuItemsProps = {
    spaces: {
      icon: spacesIcon,
      text: 'Spaces',
      isActive: activeMenuItem === MenuItemLabels.SPACES,
      clickHandler: () => {
        changeMenuItem(MenuItemLabels.SPACES, appRoutesService.getSpacesRoutePath());
      },
    },
    settings: {
      icon: settingsIcon,
      text: 'Settings',
      isActive: activeMenuItem === MenuItemLabels.SETTINGS,
      clickHandler: () => {
        changeMenuItem(MenuItemLabels.SETTINGS, appRoutesService.getSettingsRoutePath());
      },
    },
    logout: {
      icon: logOutIcon,
      text: 'Log out',
      clickHandler: () => {},
    },
  };

  useEffect(() => {
    if (location.pathname === appRoutesService.getSettingsRoutePath()) {
      setActiveMenuItem(MenuItemLabels.SETTINGS);
    } else {
      setActiveMenuItem(MenuItemLabels.SPACES);
    }
  }, []);

  function changeMenuItem(nextMenuItemLabel: MenuItemLabels, nextRoute: string) {
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
