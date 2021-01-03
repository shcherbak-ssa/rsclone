import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import './form-container.scss';

import { authController } from '../../controllers/auth.controller';
import { storeSelectors } from '../../store';
import { IS_ERROR_CLASSNAME } from '../../constants';

export type FormContainerProps = {
  title: string,
  buttonValue: string,
  message: string,
  messageLink: string,
  nextHistoryPath: string,
  children?: React.ReactNode,
};

export function FormContainer({
  title,
  children,
  buttonValue,
  message,
  messageLink,
  nextHistoryPath,
}: FormContainerProps) {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const formError = useSelector(storeSelectors.getFormError());

  const componentClassnames = classnames('form-container form', {
    [IS_ERROR_CLASSNAME]: isError,
  });

  useEffect(() => {
    setIsError(!!formError);
  }, [formError]);

  function formLinkClickHande() {
    history.push(nextHistoryPath);
    authController.toggleMode();
  }

  function buttonClickHandle() {
    authController.runCurrentMode();
  }

  return (
    <div className={componentClassnames}>
      <div className="form-title">{title}</div>
      <div className="form-error">{formError}</div>
      <div className="form-inputs">{children}</div>
      <div
        className="form-button"
        data-class="click"
        onClick={buttonClickHandle}
      >{buttonValue}</div>
      <div className="form-message">
        {message}
        <span className="form-link" onClick={formLinkClickHande}>{messageLink}</span>
      </div>
    </div>
  );
}
