import React, { useState } from 'react';
import classnames from 'classnames';
import './styles/auth-form.component.scss';

import { Classnames } from '../constants';
import { Base, BaseButtonProps } from './base';

export type AuthFormComponentProps = {
  title: string;
  linkText: string;
  buttonProps: BaseButtonProps;
  linkClickHanlder: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
};

export function AuthFormComponent({
  title, buttonProps, linkText, linkClickHanlder, children,
}: AuthFormComponentProps) {
  const [isError, setIsError] = useState(false);

  const componentClassnames = classnames('auth-form', {
    [Classnames.IS_ERROR]: isError,
  });

  return (
    <div className={componentClassnames}>
      <div className="auth-form-title">{title}</div>
      <div className="auth-form-error"></div>
      <div className="auth-form-inputs">{children}</div>
      <Base.Button {...buttonProps} />
      <div className="auth-form-link" onClick={linkClickHanlder}>{linkText}</div>
    </div>
  );
}
