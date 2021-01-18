import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { MenuComponent, MenuComponentProps } from '../components/menu.component';
import { MenuItemLabels, PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';
import { LogoutPopupContainer } from './popups/logout-popup.container';
import { MenuItemComponentProps } from '../components/menu-item.component';
import { useAppLanguage } from '../hooks/app-language.hook';
import { AppRoutesService } from '../services/app-routes.service';
import { UserDataLabels } from '../constants';
import { useUserState } from '../hooks/user-state.hook';

export function MenuContainer() {
  const history = useHistory();
  const appLanguage = useAppLanguage();
  const [activeMenuItem, setActiveMenuItem] = useState('');

  const appRoutesService: AppRoutesService = new AppRoutesService();
  const userAvatarUrl = useUserState(UserDataLabels.AVATAR);
  const userFullname = useUserState(UserDataLabels.FULLNAME);

  const menuItemsProps: {[key: string]: MenuItemComponentProps} = {
    spaces: {
      icon: spacesIcon,
      text: appLanguage.menu.items[MenuItemLabels.SPACES],
      isActive: activeMenuItem === MenuItemLabels.SPACES,
      clickHandler: () => {
        changeMenuItem(
          MenuItemLabels.SPACES,
          appRoutesService.getSpacesRoutePath(),
        );
      },
    },
    settings: {
      icon: settingsIcon,
      text: appLanguage.menu.items[MenuItemLabels.SETTINGS],
      isActive: activeMenuItem === MenuItemLabels.SETTINGS,
      clickHandler: () => {
        changeMenuItem(
          MenuItemLabels.SETTINGS,
          appRoutesService.getSettingsRoutePath(),
        );
      },
    },
    logout: {
      icon: logOutIcon,
      text: appLanguage.menu.items[MenuItemLabels.LOGOUT],
      clickHandler: () => {
        const popupService: PopupService = new PopupService();
        popupService.openPopup(PopupNames.LOGOUT);
      },
    },
  };

  const menuComponentProps: MenuComponentProps = {
    menuItemsProps,
    avatarUrl: userAvatarUrl,
    activeMenuItem,
    userFullname,
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
    <>
      <MenuComponent {...menuComponentProps}/>
      <LogoutPopupContainer />
    </>
  );
}
