import React, { useState } from 'react';
import classnames from 'classnames';
import './styles/auth-form.component.scss';

import { Classnames } from '../constants';
import { Base, BaseButtonProps, BaseInputProps } from './base';

export type AuthFormComponentProps = {
  title: string;
  inputsProps: Array<BaseInputProps>;
  buttonProps: BaseButtonProps;
  linkText: string;
  linkClickHanlder: (event: React.MouseEvent) => void;
};

export function AuthFormComponent({
  title, inputsProps, buttonProps, linkText, linkClickHanlder,
}: AuthFormComponentProps) {
  const [isError, setIsError] = useState(false);

  const componentClassnames = classnames('auth-form', {
    [Classnames.IS_ERROR]: isError,
  });

  function drawInputs() {
    return inputsProps.map((inputProps, index) => {
      return <Base.Input key={index} {...inputProps} />;
    });
  }

  return (
    <div className={componentClassnames}>
      <div className="auth-form-title">{title}</div>
      <div className="auth-form-error"></div>
      <div className="auth-form-inputs">{drawInputs()}</div>
      <Base.Button {...buttonProps} />
      <div className="auth-form-link" onClick={linkClickHanlder}>{linkText}</div>
    </div>
  );
}
