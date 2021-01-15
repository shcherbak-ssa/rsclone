import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import './styles/menu.component.scss';

import spacesIcon from '@iconify/icons-uil/apps';
import settingsIcon from '@iconify/icons-clarity/settings-line';
import logOutIcon from '@iconify/icons-feather/log-out';

import { Stores, UserDataLabels } from '../constants';
import { Classnames, MenuItemLabels } from '../constants/ui.constants';
import { AppRoutesService } from '../services/app-routes.service';
import { DocumentBodyService } from '../services/document-body.service';
import { storeSelectorsService } from '../services/store-selectors.service';
import { MenuItemComponentProps, MenuItemComponent } from './menu-item.component';
import { LanguageParts } from '../../common/constants';
import { useLanguagePart } from '../hooks/language-part.hook';

export type MenuComponentProps = {
  logOutClickHanlder: Function,
};

export function MenuComponent({logOutClickHanlder}: MenuComponentProps) {
  const history = useHistory();
  const appLanguage = useLanguagePart(LanguageParts.APP);

  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const fullname = useSelector(userStoreSelectors.getState(UserDataLabels.FULLNAME));
 
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const appRoutesService: AppRoutesService = new AppRoutesService();
  const componentClassnames: string = classnames('menu', {
    [Classnames.IS_OPEN]: isOpen,
  });

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
        logOutClickHanlder();
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
      documentBodyService
        .setOveflowHidden()
        .addClass(Classnames.SHOW_SIDEBAR);
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

  function cleanDocumentBody(documentBodyService: DocumentBodyService = new DocumentBodyService()) {
    documentBodyService
      .removeOverflowHidden()
      .removeClass(Classnames.SHOW_SIDEBAR);
  }

  return (
    <div className={componentClassnames} onClick={closeMenuClickHandle}>
      <div className="menu-container" data-class="flex-column">
        <div className="menu-user">
          {/* <Avatar /> */}
          <div className="menu-username">{fullname}</div>
        </div>
        <MenuItemComponent {...menuItemsProps.spaces}/>
        <MenuItemComponent {...menuItemsProps.settings}/>
        <div className="menu-line"></div>
        <MenuItemComponent {...menuItemsProps.logout}/>
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
