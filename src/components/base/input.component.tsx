import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './styles/input.component.scss';

import { Classnames } from '../../constants/ui.constants';
import { EMPTY_VALUE_LENGTH } from '../../constants';
import { InputIconComponent, InputIconComponentProps } from './input-icon.component';
import { useLanguagePart } from '../../hooks/language-part.hook';
import { LanguageParts } from '../../../common/constants';

export type InputIconProps = InputIconComponentProps;

export type BaseInputProps = {
  value: string;
  placeholder: string;
  error: string;
  description?: string;
  updateValue: Function;
  inputIconProps?: InputIconProps;
  transformValue?: Function;
};

export function InputComponent({
  value, placeholder, error, description, updateValue, inputIconProps, transformValue,
}: BaseInputProps) {
  const inputField = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const assetsLanguage = useLanguagePart(LanguageParts.ASSETS);

  const componentClassnames = classnames('input', {
    [Classnames.IS_ACTIVE]: isActive,
    [Classnames.IS_ERROR]: !!error,
    [Classnames.HAS_DESCRIPTION]: !!description,
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

  function focusHandle() {
    setIsActive(true);
  }

  function blurHandle() {
    if (value.length === EMPTY_VALUE_LENGTH) {
      setIsActive(false);
    }
  }

  function changeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    updateValue(e.target.value);
  }

  function showIcon() {
    return inputIconProps ? <InputIconComponent {...inputIconProps} /> : '';
  }

  function showDescription() {
    return description ? <div className="input-description">{description}</div> : '';
  }

  function getInputError() {
    return assetsLanguage.errors[error];
  }

  return (
    <div className={componentClassnames}>
      <div className="input-container" data-class="click shadow" onClick={clickHandle}>
        <input
          ref={inputField}
          type="text"
          className="input-field"
          value={transformValue ? transformValue(value) : value}
          onFocus={focusHandle}
          onBlur={blurHandle}
          onChange={changeHandle}
        />
        <div className="input-placeholder">{placeholder}</div>
        {showIcon()}
      </div>
      <div className="input-error">{getInputError()}</div>
      {showDescription()}
    </div>
  );
}
