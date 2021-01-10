import React from 'react';
import classnames from 'classnames';
import './styles/radio.component.scss';

import { Classnames } from '../../constants';

export type BaseRadioProps = {
  label: string;
  isSelected: boolean;
  description: string;
  clickHanlder: (label: string) => void;
};

export function RadioComponent({
  label, isSelected, description, clickHanlder,
}: BaseRadioProps) {
  const componentClassnames = classnames('radio', {
    [Classnames.IS_SELECTED]: isSelected,
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
