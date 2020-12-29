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

export function AuthComponent() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const componentClassname = classnames('auth', {
    [IS_LOGIN_MODE_CLASSNAME]: isLoginMode
  });

  function toggleLoginMode() {
    setIsLoginMode(!isLoginMode);
  }

  return (
    <div className={componentClassname}>
      <div className="auth-content">
        <div className="auth-header">
          <div className="auth-logo"></div>
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
