import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import './menu.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { AppEvents, IS_OPEN_CLASSNAME, MenuItemLabels } from '../../constants';
import { storeSelectors } from '../../store';
import { AppRoutesService } from '../../../services/app-routes.service';
import { MenuItem } from '../menu-item';
import { Avatar } from '../avatar';
import { PopupProps } from '../../containers/popup';
import { popupController } from '../../controllers/popup.controller';
import { DeleteUserService } from '../../../services/delete-user.service';

export function Menu() {
  const history = useHistory();
  const {name: userName} = useSelector(storeSelectors.user.get()); 
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const appRoutesService: AppRoutesService = new AppRoutesService();
  const componentClassnames = classnames('menu', {
    [IS_OPEN_CLASSNAME]: isOpen,
  });

  const logoutPopupProps: PopupProps = {
    title: 'Log out',
    body: <div className="popup-body-text">Are you sure you want to exit?</div>,
    confirmButtonProps: {
      value: 'Log out',
      clickHandler: () => {
        new DeleteUserService().deleteFromLocal();
        popupController.emit(AppEvents.CLOSE_POPUP);
      },
    },
  };

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
      clickHandler: () => {
        popupController.emit(AppEvents.SHOW_POPUP, logoutPopupProps);
      },
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

    setIsOpen(false);
  }

  function menuButtonClickHandle() {
    setIsOpen(!isOpen);

    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  return (
    <div className={componentClassnames}>
      <div className="menu-container" data-class="flex-column">
        <div className="menu-user">
          <Avatar />
          <div className="menu-username">{userName}</div>
        </div>
        <MenuItem {...menuItemsProps.spaces} />
        <MenuItem {...menuItemsProps.settings} />
        <div className="menu-line"></div>
        <MenuItem {...menuItemsProps.logout} />
        <div
          className="menu-button"
          data-class="flex-center click"
          onClick={menuButtonClickHandle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
