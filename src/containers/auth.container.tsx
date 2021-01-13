import React from 'react';

import { AuthFormComponent, AuthFormComponentProps } from "../components/auth-form.component";
import { AuthComponent, AuthComponentProps } from "../components/auth.component";
import { PopupInitialSettingsContainer } from './popup-initial-settings.container';

export type AuthContainerProps = {
  authFormComponentProps: AuthFormComponentProps;
};

export function AuthContainer({authFormComponentProps}: AuthContainerProps) {
  const authComponentProps: AuthComponentProps = {
    settingsActionIconClickHandler: () => {
      console.log('settings');
    },
  };

  return (
    <AuthComponent {...authComponentProps}>
      <AuthFormComponent {...authFormComponentProps} />
      <PopupInitialSettingsContainer />
    </AuthComponent>
  );
}
