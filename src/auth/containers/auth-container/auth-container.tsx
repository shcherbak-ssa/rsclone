import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import './auth-container.scss';

import {
  IS_LOGIN_MODE_CLASSNAME,
  LOGIN_MODE_LABEL,
  LOGIN_ROUTE_PATHNAME,
  REGISTRATION_ROUTE_PATHNAME
} from '../../constants';

import { Registration } from '../../components/registration';
import { Login } from '../../components/login';
import { assetsService } from '../../services/assets.service';
import { storeSelectors } from '../../store';

const LOGO_ICON: string = 'logo';
const LOGO_LOGIN_ICON: string = 'logo-login';

export function AuthContainer() {
  const { currentMode } = useSelector(storeSelectors.getCurrentMode());
  const isLoginMode = currentMode === LOGIN_MODE_LABEL;

  const componentClassname = classnames('auth', {
    [IS_LOGIN_MODE_CLASSNAME]: isLoginMode,
  });

  function updateLogoIcon() {
    return assetsService.getIconUrl(isLoginMode ? LOGO_LOGIN_ICON : LOGO_ICON);
  }

  return (
    <div className={componentClassname}>
      <div className="auth-content">
        <div className="auth-header">
          <img src={updateLogoIcon()} className="auth-logo" />
          Gitbook Clone
        </div>
        <div className="auth-form" data-class="shadow">
          <Router>
            <Switch>
              <Route path="/" exact>
                <Redirect to={REGISTRATION_ROUTE_PATHNAME} />
              </Route>
              <Route path={REGISTRATION_ROUTE_PATHNAME}>
                <Registration />
              </Route>
              <Route path={LOGIN_ROUTE_PATHNAME}>
                <Login />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
      <div className="auth-decoration"></div>
    </div>
  );
}
