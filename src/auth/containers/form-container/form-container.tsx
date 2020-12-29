import React from 'react';
import { useHistory } from 'react-router-dom';
import './form-container.scss';

export type FormContainerProps = {
  title: string,
  socialDescription: string,
  buttonValue: string,
  message: string,
  messageLink: string,
  nextHistoryPath: string,
  toggleMode: Function,
  children?: React.ReactNode,
};

export function FormContainer({
  title,
  socialDescription,
  children,
  buttonValue,
  message,
  messageLink,
  nextHistoryPath,
  toggleMode,
}: FormContainerProps) {
  const history = useHistory();

  function formLinkClickHande() {
    history.push(nextHistoryPath);
    toggleMode();
  }

  return (
    <div className="form-container form">
      <div className="form-title">{title}</div>
      <div className="form-social">
        {socialDescription}
        <div className="form-social-icons"></div>
      </div>
      <div className="form-inputs">{children}</div>
      <div className="form-button" data-class="click">{buttonValue}</div>
      <div className="form-message">
        {message}
        <span className="form-link" onClick={formLinkClickHande}>{messageLink}</span>
      </div>
    </div>
  );
}
