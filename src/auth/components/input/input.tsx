import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import './input.scss';

const IS_ACTIVE_CLASSNAME: string = 'is-active';
const IS_ERROR_CLASSNAME: string = 'is-error';

export function Input() {
  const inputField = useRef<HTMLInputElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const componentClassname = classnames('input', {
    [IS_ACTIVE_CLASSNAME]: isActive,
    [IS_ERROR_CLASSNAME]: isError,
  });

  function clickHandle() {
    setIsActive(true);
    
    if (inputField && inputField.current) {
      inputField.current.focus();
    }
  }

  function blurHandle() {}

  return (
    <div
      className={componentClassname}
      data-class="shadow click"
      onClick={clickHandle}
      onBlur={blurHandle}
    >
      <div className="input-placeholder"></div>
      <input ref={inputField} type="text" className="input-field"/>
      <div className="input-error"></div>
    </div>
  );
}
