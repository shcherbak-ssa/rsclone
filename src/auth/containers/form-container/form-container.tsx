import React from 'react';
import './form-container.scss';

export type FormContainerProps = {
  title: string,
  socialDescription: string,
  buttonValue: string,
  message: string,
  messageLink: string,
  messageLinkClickHandle: Function,
  children: React.ReactChildren,
};

export function FormContainer({
  title,
  socialDescription,
  children,
  buttonValue,
  message,
  messageLink,
  messageLinkClickHandle,
}: FormContainerProps) {

  function formLinkClickHande() {
    messageLinkClickHandle();
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
