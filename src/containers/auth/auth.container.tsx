import React from 'react';
import { useSelector } from 'react-redux';

import { Stores } from '../../constants';
import { AuthComponent, AuthComponentProps } from "../../components/auth.component";
import { PopupNames } from '../../constants/ui.constants';
import { PopupService } from '../../services/popup.service';
import { InitialSettingsPopupContainer } from '../popups/initial-settings-popup.container';
import { storeSelectorsService } from '../../services/store-selectors.service';
import { useChangeTheme } from '../../hooks/change-theme.hook';

type AuthContainerProps = {
  children?: React.ReactNode,
};

export function AuthContainer({children}: AuthContainerProps) {
  const authStoreSelectors = storeSelectorsService.get(Stores.AUTH_STORE);
  const currentTheme = useSelector(authStoreSelectors.getThemeState());

  useChangeTheme(currentTheme);

  const authComponentProps: AuthComponentProps = {
    settingsActionIconClickHandler: () => {
      const popupService: PopupService = new PopupService();
      popupService.openPopup(PopupNames.INITIAL_SETTINGS);
    },
  };

  return (
    <AuthComponent {...authComponentProps}>
      {children}
      <InitialSettingsPopupContainer />
    </AuthComponent>
  );
}
