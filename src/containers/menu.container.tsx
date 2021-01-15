import React from 'react';

import { MenuComponent, MenuComponentProps } from '../components/menu.component';
import { PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';
import { LogoutPopupContainer } from './popups/logout-popup.container';

export function MenuContainer() {
  const menuComponentProps: MenuComponentProps = {
    logOutClickHanlder: () => {
      const popupService: PopupService = new PopupService();
      popupService.openPopup(PopupNames.LOGOUT);
    },
  };
  
  return (
    <>
      <MenuComponent {...menuComponentProps}/>
      <LogoutPopupContainer />
    </>
  );
}
