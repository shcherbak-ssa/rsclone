import React from 'react';
import classnames from 'classnames';
import './styles/button.component.scss';

import { Icon } from '@iconify/react';
import { ButtonTypes } from '../../constants/ui.constants';

const BUTTON_ICON_HEIGHT: number = 18;

export type BaseButtonProps = {
  type?: ButtonTypes,
  icon?: object,
  value: string,
  clickHandler: (e: React.MouseEvent) => void,
};

export function ButtonComponent({
  type = ButtonTypes.PRIMARY, icon, value, clickHandler,
}: BaseButtonProps) {
  const componentClassnames = classnames('button', type);

  function drawButtonIcon() {
    if (!icon) return '';

    return (
      <div className="button-icon">
        <Icon icon={icon} height={BUTTON_ICON_HEIGHT} />
      </div>
    );
  }

  return (
    <div
      className={componentClassnames}
      data-class="click flex-center"
      onClick={clickHandler}
    >
      {drawButtonIcon()}
      <div className="button-value">{value}</div>
    </div>
  );
}
