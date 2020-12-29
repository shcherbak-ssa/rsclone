import React, { useState } from 'react';
import classnames from 'classnames';
import './auth.scss';

import { IS_LOGIN_MODE_CLASSNAME } from '../../constants';

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
      </div>
      <div className="auth-decoration"></div>
    </div>
  );
}
