import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { AppRoutePathnames, Stores } from '../../constants';
import { AuthComponent, AuthComponentProps } from "../../components/auth.component";
import { PopupNames } from '../../constants/ui.constants';
import { PopupService } from '../../services/popup.service';
import { InitialSettingsPopupContainer } from '../popups/initial-settings-popup.container';
import { DocumentBodyService } from '../../services/document-body.service';
import { storeSelectorsService } from '../../services/store-selectors.service';

export default function AuthContainer() {
  const LoginContainer = lazy(() => import('./login.container'));
  const RegistrationContainer = lazy(() => import('./registration.container'));
  
  const authStoreSelectors = storeSelectorsService.get(Stores.AUTH_STORE);
  const currentTheme = useSelector(authStoreSelectors.getThemeState());

  const authComponentProps: AuthComponentProps = {
    settingsActionIconClickHandler: () => {
      const popupService: PopupService = new PopupService();
      popupService.openPopup(PopupNames.INITIAL_SETTINGS);
    },
  };

  useEffect(() => {
    const documentBodyService = new DocumentBodyService();
    documentBodyService.addClass(currentTheme);

    return () => {
      documentBodyService.removeClass(currentTheme);
    };
  }, [currentTheme]);

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
