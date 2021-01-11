import React from 'react';
import classnames from 'classnames';
import './styles/auth-form.component.scss';

import { Classnames } from '../constants';
import { Base, BaseButtonProps, BaseInputProps } from './base';

export type AuthFormComponentProps = {
  title: string;
  linkText: string;
  authError: string;
  inputsProps: BaseInputProps[],
  buttonProps: BaseButtonProps;
  linkClickHanlder: (event: React.MouseEvent) => void;
};

export function AuthFormComponent({
  title, linkText, authError, inputsProps, buttonProps, linkClickHanlder,
}: AuthFormComponentProps) {
  const componentClassnames = classnames('auth-form', {
    [Classnames.IS_ERROR]: !!authError,
  });

  function drawInputs() {
    return inputsProps.map((inputProps, index) => {
      return <Base.Input key={index} {...inputProps} />
    });
  }

  return (
    <div className={componentClassnames}>
      <div className="auth-form-title">{title}</div>
      <div className="auth-form-error">{authError}</div>
      <div className="auth-form-inputs">{drawInputs()}</div>
      <Base.Button {...buttonProps} />
      <div className="auth-form-link" onClick={linkClickHanlder}>{linkText}</div>
    </div>
  );
}
