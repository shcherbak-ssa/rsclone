import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import './input.scss';

import { assetsService } from '../../services/assets.service';
import { InputLabels } from '../../constants';
import { storeSelectors } from '../../store';
import { authController } from '../../controllers/auth.controller';

const IS_ACTIVE_CLASSNAME: string = 'is-active';
const IS_ERROR_CLASSNAME: string = 'is-error';
const EMPTY_VALUE_LENGTH: number = 0;

export type InputProps = {
  placeholder: string,
  inputLabel: InputLabels,
  updateValue?: Function,
  transformValue?: Function,
  icon?: string,
  iconClickHandle?: Function,
};

export function Input({
  placeholder,
  inputLabel,
  updateValue,
  transformValue,
  icon,
  iconClickHandle,
}: InputProps) {
  const {value, error} = useSelector(storeSelectors.getInput(inputLabel));

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
    const newValue = e.target.value;

    if (updateValue) {
      updateValue(value, newValue);
    } else {
      authController.updateInputValue(newValue, inputLabel);
    }
  }

  function inputIconClickHandle(e: React.MouseEvent<HTMLImageElement>) {
    if (e.target instanceof HTMLImageElement) {
      e.target.classList.toggle(IS_ACTIVE_CLASSNAME);
      
      if (iconClickHandle) {
        iconClickHandle();
      }
    }
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
        value={transformValue ? transformValue(value) : value}
        onBlur={blurHandle}
        onChange={changeHandle}
      />
      <div className="input-placeholder">{placeholder}</div>
      <div className="input-error">{error}</div>
      {
        icon
          ? <img
              src={assetsService.getIconUrl(icon)}
              className="input-icon"
              onClick={inputIconClickHandle}
            />
          : ''
      }
    </div>
  );
}
