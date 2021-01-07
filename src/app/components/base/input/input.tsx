import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './input.scss';

import {
  IS_ACTIVE_CLASSNAME,
  IS_ERROR_CLASSNAME,
  EMPTY_VALUE_LENGTH,
} from '../../../constants';
import { Icon } from '@iconify/react';

const HAS_DESCRIPTION_CLASSNAME: string = 'has-description';
const ICON_HEIGHT: number = 24;

export type BaseInputProps = {
  value: string,
  placeholder: string,
  error: string,
  description?: string,
  updateValue: Function,
  icon?: object,
  iconClickHandler?: Function,
  transformValue?: Function,
};

export function Input({
  value, placeholder, error, description, updateValue, icon, iconClickHandler, transformValue,
}: BaseInputProps) {
  const inputField = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isIconActive, setIsIconActive] = useState(false);

  const componentClassname = classnames('base-input', {
    [IS_ACTIVE_CLASSNAME]: isActive,
    [IS_ERROR_CLASSNAME]: !!error,
    [HAS_DESCRIPTION_CLASSNAME]: !!description,
  });

  const iconClassname = classnames('base-input-icon', {
    [IS_ACTIVE_CLASSNAME]: isIconActive,
  });

  const iconProps = {
    icon,
    height: ICON_HEIGHT,
  };

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

  function iconClickHandle() {
    setIsIconActive(!isIconActive);
    iconClickHandler(!isIconActive);
  }

  function showIcon() {
    if (!icon) return '';

    return (
      <div className={iconClassname} data-class="click" onClick={iconClickHandle}>
        <Icon {...iconProps} />
      </div> 
    );
  }

  return (
    <div className={componentClassname} onClick={clickHandle}>
      <div className="base-input-container" data-class="click">
        <input
          ref={inputField}
          type="text"
          className="base-input-field"
          value={transformValue ? transformValue(value) : value}
          onBlur={blurHandle}
          onChange={changeHandle}
        />
        <div className="base-input-placeholder">{placeholder}</div>
        {showIcon()}
      </div>
      <div className="base-input-error">{error}</div>
      {description ? <div className="base-input-description">{description}</div> : ''}
    </div>
  );
}
