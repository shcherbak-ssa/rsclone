import React from 'react';
import './styles/auth.component.scss';

import { AssetsService } from "../services/assets.service";

const LOGO_LOGIN_ICON: string = 'logo-login';

const assetsService: AssetsService = new AssetsService();
const logoIcon: string = assetsService.getIconUrl(LOGO_LOGIN_ICON);

type AuthComponentProps = {
  children?: React.ReactNode;
};

export function AuthComponent({children}: AuthComponentProps) {
  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-header">
          <img src={logoIcon} className="auth-logo" />
          GitBook Clone
        </div>
        <div className="auth-form-container" data-class="shadow">
          {children}
        </div>
      </div>
      <div className="auth-decoration"></div>
    </div>
  );
}
