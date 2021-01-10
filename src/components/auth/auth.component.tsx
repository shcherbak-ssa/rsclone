import React from 'react';
import classnames from 'classnames';
import './auth.component.scss';

import { Classnames } from '../../constants';
import { AssetsService } from "../../services/assets.service";

const LOGO_ICON: string = 'logo';
const LOGO_LOGIN_ICON: string = 'logo-login';

export type AuthComponentProps = {
  isLogin: boolean;
};

export function AuthComponent({isLogin}: AuthComponentProps) {
  const componentClassnames = classnames('auth', {
    [Classnames.IS_LOGIN_MODE]: isLogin,
  });

  function updateLogoIcon() {
    const assetsService: AssetsService = new AssetsService();
    return assetsService.getIconUrl(isLogin ? LOGO_LOGIN_ICON : LOGO_ICON);
  }

  return (
    <div className={componentClassnames}>
      <div className="auth-content">
        <div className="auth-header">
          <img src={updateLogoIcon()} className="auth-logo" />
          Gitbook Clone
        </div>
        <div className="auth-form" data-class="shadow">
          
        </div>
      </div>
      <div className="auth-decoration"></div>
    </div>
  );
}
