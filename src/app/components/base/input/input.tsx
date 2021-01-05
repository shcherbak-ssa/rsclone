import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import './input.scss';

import {
  IS_ACTIVE_CLASSNAME,
  IS_ERROR_CLASSNAME,
  EMPTY_VALUE_LENGTH,
} from '../../../constants';

export type BaseInputProps = {
  value: string,
  placeholder: string,
  error: string,
  updateValue: Function,
};

export function Input({
  value, placeholder, error, updateValue,
}: BaseInputProps) {
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
      data-class="click"
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
