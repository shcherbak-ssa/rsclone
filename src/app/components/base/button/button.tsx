import React from 'react';
import './button.scss';

import { Icon } from '@iconify/react';

const BUTTON_ICON_HEIGHT: number = 18;

export type BaseButtonProps = {
  icon?: object,
  value: string,
  clickHandler: () => void,
};

export function Button({icon, value, clickHandler}: BaseButtonProps) {
  return (
    <div className="button" data-class="click" onClick={clickHandler}>
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
