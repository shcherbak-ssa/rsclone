import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { AppRoutePathnames, Stores } from '../../constants';
import { AuthComponent, AuthComponentProps } from "../../components/auth.component";
import { PopupNames } from '../../constants/ui.constants';
import { PopupService } from '../../services/popup.service';
import { InitialSettingsPopupContainer } from '../popups/initial-settings-popup.container';
import { storeSelectorsService } from '../../services/store-selectors.service';
import { useChangeTheme } from '../../hooks/change-theme.hook';

export default function AuthContainer() {
  const LoginContainer = lazy(() => import('./login.container'));
  const RegistrationContainer = lazy(() => import('./registration.container'));
  
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
      <Suspense fallback={<div>Loading...</div>}>
        <Route path={AppRoutePathnames.LOGIN} component={LoginContainer} />
        <Route path={AppRoutePathnames.REGISTRATION} component={RegistrationContainer} />
      </Suspense>
      <InitialSettingsPopupContainer />
    </AuthComponent>
  );
}
