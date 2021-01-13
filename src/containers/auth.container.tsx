import React from 'react';

import { AuthFormComponent, AuthFormComponentProps } from "../components/auth-form.component";
import { AuthComponent, AuthComponentProps } from "../components/auth.component";
import { PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';
import { PopupInitialSettingsContainer } from './popup-initial-settings.container';

export type AuthContainerProps = {
  authFormComponentProps: AuthFormComponentProps;
};

export function AuthContainer({authFormComponentProps}: AuthContainerProps) {
  const authComponentProps: AuthComponentProps = {
    settingsActionIconClickHandler: () => {
      const popupService: PopupService = new PopupService();
      popupService.openPopup(PopupNames.INITIAL_SETTINGS);
    },
  };

  return (
    <AuthComponent {...authComponentProps}>
      <AuthFormComponent {...authFormComponentProps} />
      <PopupInitialSettingsContainer />
    </AuthComponent>
  );
}
