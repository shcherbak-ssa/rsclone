import React from 'react';
import classnames from 'classnames';
import './radio.scss';

import { IS_SELECTED_CLASSNAME } from '../../../constants';

export type BaseRadioProps = {
  label: string;
  isSelected: boolean;
  description: string;
  clickHanlder: (label: string) => void;
};

export function Radio({
  label, isSelected, description, clickHanlder,
}: BaseRadioProps) {
  const componentClassnames = classnames('radio', {
    [IS_SELECTED_CLASSNAME]: isSelected,
  });

  function clickHandle() {
    clickHanlder(label);
  }

  return (
    <div className={componentClassnames} data-class="click" onClick={clickHandle}>
      <div className="radio-label" data-class="flex-center">
        <span></span>
      </div>
      <div className="radio-description">{description}</div>
    </div>
  );
}
