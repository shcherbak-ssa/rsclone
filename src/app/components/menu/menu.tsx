import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import './menu.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { IS_OPEN_CLASSNAME, MenuItemLabels } from '../../constants';
import { storeSelectors } from '../../store';
import { AppRoutesService } from '../../../services/app-routes.service';
import { MenuItem } from '../menu-item';
import { Avatar } from '../avatar';
import { Popup, PopupProps } from '../../containers/popup';
import { DeleteUserService } from '../../../services/delete-user.service';
import { DocumentBodyService } from '../../../services/document-body.service';

const SHOW_SIDEBAR_CLASSNAME: string = 'show-sidebar';

export function Menu() {
  const history = useHistory();
  const {name: userName} = useSelector(storeSelectors.user.get()); 
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const appRoutesService: AppRoutesService = new AppRoutesService();
  const componentClassnames = classnames('menu', {
    [IS_OPEN_CLASSNAME]: isOpen,
  });

  const logoutPopupProps: PopupProps = {
    title: 'Log out',
    confirmButtonProps: {
      value: 'Log out',
      clickHandler: () => {
        new DeleteUserService().deleteFromLocal();
      },
    },
    closePopup: () => {
      setIsPopupOpen(false);
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
        setIsPopupOpen(true);
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
    cleanDocumentBody();
  }

  function menuButtonClickHandle(e: React.MouseEvent) {
    e.stopPropagation();
    setIsOpen(!isOpen);

    const documentBodyService = new DocumentBodyService();

    if (!isOpen) {
      documentBodyService.setOveflowHidden();
      documentBodyService.addClass(SHOW_SIDEBAR_CLASSNAME);
    } else {
      cleanDocumentBody(documentBodyService);
    }
  }

  function closeMenuClickHandle(e: React.MouseEvent) {
    e.stopPropagation();

    if (e.target.classList.contains('menu')) {
      setIsOpen(false);
      cleanDocumentBody();
    }
  }

  function cleanDocumentBody(
    documentBodyService: DocumentBodyService = new DocumentBodyService()
  ) {
    documentBodyService.removeOverflowHidden();
    documentBodyService.removeClass(SHOW_SIDEBAR_CLASSNAME);
  }

  function showLogoutPopup() {
    if (!isPopupOpen) return '';

    return (
      <Popup {...logoutPopupProps}>
        <div className="popup-body-text">Are you sure you want to exit?</div>
      </Popup>
    );
  }

  return (
    <div className={componentClassnames} onClick={closeMenuClickHandle}>
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
      {showLogoutPopup()}
    </div>
  );
}
