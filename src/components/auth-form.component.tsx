import React from 'react';
import classnames from 'classnames';
import './styles/auth-form.component.scss';

import { Classnames } from '../constants';
import { Base, BaseButtonProps } from './base';

export type AuthFormComponentProps = {
  title: string;
  linkText: string;
  authError: string;
  buttonProps: BaseButtonProps;
  linkClickHanlder: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
};

export function AuthFormComponent({
  title, linkText, authError, buttonProps, linkClickHanlder, children,
}: AuthFormComponentProps) {
  const componentClassnames = classnames('auth-form', {
    [Classnames.IS_ERROR]: !!authError,
  });

  return (
    <div className={componentClassnames}>
      <div className="auth-form-title">{title}</div>
      <div className="auth-form-error">{authError}</div>
      <div className="auth-form-inputs">{children}</div>
      <Base.Button {...buttonProps} />
      <div className="auth-form-link" onClick={linkClickHanlder}>{linkText}</div>
    </div>
  );
}
