import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './styles/menu.component.scss';

import { Classnames } from '../constants/ui.constants';
import { DocumentBodyService } from '../services/document-body.service';
import { MenuItemComponentProps, MenuItemComponent } from './menu-item.component';
import { AvatarComponent, AvatarComponentProps } from './avatar.component';

export type MenuComponentProps = {
  menuItemsProps: {[key: string]: MenuItemComponentProps},
  avatarUrl: string,
  userFullname: string,
  activeMenuItem: string,
};

export function MenuComponent({
  menuItemsProps, avatarUrl, userFullname, activeMenuItem
}: MenuComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const componentClassnames: string = classnames('menu', {
    [Classnames.IS_OPEN]: isOpen,
  });

  const avatarComponentProps: AvatarComponentProps = {
    avatarUrl,
    userFullname,
  };

  useEffect(() => {
    setIsOpen(false);
    cleanDocumentBody();
  }, [activeMenuItem]);

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
          <AvatarComponent {...avatarComponentProps}/>
          <div className="menu-username">{userFullname}</div>
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
