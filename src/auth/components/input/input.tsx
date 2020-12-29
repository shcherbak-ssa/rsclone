import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './input.scss';
import { assetsService } from '../../services/assets-service';

const IS_ACTIVE_CLASSNAME: string = 'is-active';
const IS_ERROR_CLASSNAME: string = 'is-error';
const EMPTY_VALUE_LENGTH: number = 0;

export type InputProps = {
  placeholder: string,
  value: string,
  error: string,
  updateValue: Function,
  icon?: string,
  iconClickHandle?: Function,
};

export function Input({
  placeholder,
  value,
  error,
  updateValue,
  icon,
  iconClickHandle,
}: InputProps) {
  const inputField = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const componentClassname = classnames('input', {
    [IS_ACTIVE_CLASSNAME]: isActive,
    [IS_ERROR_CLASSNAME]: !!error,
  });

  useEffect(() => {
    if (inputField && inputField.current) {
      inputField.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [value]);

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
    
    if (inputField && inputField.current) {
      setCursorPosition(inputField.current.selectionStart || value.length);
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
        value={value}
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
