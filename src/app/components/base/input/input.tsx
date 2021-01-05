import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './input.scss';

import {
  IS_ACTIVE_CLASSNAME,
  IS_ERROR_CLASSNAME,
  EMPTY_VALUE_LENGTH,
} from '../../../constants';

const HAS_DESCRIPTION_CLASSNAME: string = 'has-description';

export type BaseInputProps = {
  value: string,
  placeholder: string,
  error: string,
  description?: string,
  updateValue: Function,
};

export function Input({
  value, placeholder, error, description, updateValue,
}: BaseInputProps) {
  const inputField = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);

  const componentClassname = classnames('base-input', {
    [IS_ACTIVE_CLASSNAME]: isActive,
    [IS_ERROR_CLASSNAME]: !!error,
    [HAS_DESCRIPTION_CLASSNAME]: !!description,
  });

  useEffect(() => {
    if (value.length > EMPTY_VALUE_LENGTH) {
      setIsActive(true);
    }
  }, []);

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
    <div className={componentClassname} onClick={clickHandle}>
      <div className="base-input-container" data-class="click">
        <input
          ref={inputField}
          type="text"
          className="base-input-field"
          value={value}
          onBlur={blurHandle}
          onChange={changeHandle}
        />
        <div className="base-input-placeholder">{placeholder}</div>
      </div>
      <div className="base-input-error">{error}</div>
      {description ? <div className="base-input-description">{description}</div> : ''}
    </div>
  );
}
