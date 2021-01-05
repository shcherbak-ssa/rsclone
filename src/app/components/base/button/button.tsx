import React from 'react';
import classnames from 'classnames';
import './button.scss';

import { Icon } from '@iconify/react';
import { ButtonTypes } from '../../../constants';

const BUTTON_ICON_HEIGHT: number = 18;

export type BaseButtonProps = {
  type?: ButtonTypes,
  icon?: object,
  value: string,
  clickHandler: () => void,
};

export function Button({
  type = ButtonTypes.PRIMARY, icon, value, clickHandler,
}: BaseButtonProps) {
  const componentClassnames = classnames('button', type);

  return (
    <div
      className={componentClassnames}
      data-class="click"
      onClick={clickHandler}
    >
      {
        icon
          ? <div className="button-icon">
              <Icon icon={icon} height={BUTTON_ICON_HEIGHT} />
            </div>
          : ''
      }
      {value}
    </div>
  );
}
