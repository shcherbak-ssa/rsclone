import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './input.scss';

const IS_ACTIVE_CLASSNAME: string = 'is-active';
const IS_ERROR_CLASSNAME: string = 'is-error';
const EMPTY_VALUE_LENGTH: number = 0;

export type InputProps = {
  placeholder: string,
  value: string,
  error: string,
  updateValue: Function,
};

export function Input({
  placeholder,
  value,
  error,
  updateValue,
}: InputProps) {
  const inputField = useRef<HTMLInputElement>(null);

  const [isActive, setIsActive] = useState(false);
  const componentClassname = classnames('input', {
    [IS_ACTIVE_CLASSNAME]: isActive,
    [IS_ERROR_CLASSNAME]: !!error,
  });

  function clickHandle() {
    setIsActive(true);
    
    if (inputField && inputField.current) {
      inputField.current.focus();
    }
  }

  function blurHandle() {
    if (value.length === EMPTY_VALUE_LENGTH) {
      setIsActive(false);
    }
  }

  function changeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    updateValue(e.target.value);
  }

  return (
    <div
      className={componentClassname}
      data-class="shadow click"
      onClick={clickHandle}
    >
      <input
        ref={inputField}
        type="text"
        className="input-field"
        value={value}
        onBlur={blurHandle}
        onChange={changeHandle}
      />
      <div className="input-placeholder">{placeholder}</div>
      <div className="input-error">{error}</div>
    </div>
  );
}
