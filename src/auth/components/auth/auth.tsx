import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import './auth.scss';

import {
  IS_LOGIN_MODE_CLASSNAME,
  LOGIN_ROUTE_PATHNAME,
  REGISTRATION_ROUTE_PATHNAME
} from '../../constants';

import { Registration } from '../registration';
import { Login } from '../login';
import { assetsService } from '../../services/assets-service';

const LOGO_ICON: string = 'logo';
const LOGO_LOGIN_ICON: string = 'logo-login';

export function AuthComponent() {
  const [logoIcon, setLogoIcon] = useState(LOGO_ICON);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const componentClassname = classnames('auth', {
    [IS_LOGIN_MODE_CLASSNAME]: isLoginMode
  });

  function toggleMode() {
    setIsLoginMode(!isLoginMode);
    setLogoIcon(!isLoginMode ? LOGO_LOGIN_ICON : LOGO_ICON);
  }

  return (
    <div className={componentClassname}>
      <div className="auth-content">
        <div className="auth-header">
          <img src={assetsService.getIconUrl(logoIcon)} className="auth-logo" />
          Gitbook Clone
        </div>
        <div className="auth-form" data-class="shadow">
          <Router>
            <Switch>
              <Route path="/" exact>
                <Redirect to={REGISTRATION_ROUTE_PATHNAME} />
              </Route>
              <Route path={REGISTRATION_ROUTE_PATHNAME}>
                <Registration toggleMode={toggleMode} />
              </Route>
              <Route path={LOGIN_ROUTE_PATHNAME}>
                <Login toggleMode={toggleMode} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
      <div className="auth-decoration"></div>
    </div>
  );
}
