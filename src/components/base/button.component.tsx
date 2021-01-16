import React from 'react';
import classnames from 'classnames';
import './styles/button.component.scss';

import { Icon } from '@iconify/react';
import { ButtonTypes, Classnames } from '../../constants/ui.constants';

const BUTTON_ICON_HEIGHT: number = 18;

export type BaseButtonProps = {
  isLoading?: boolean,
  isDisable?: boolean,
  type?: ButtonTypes,
  icon?: object,
  value: string,
  clickHandler: Function,
};

export function ButtonComponent({
  isLoading = false, isDisable = false, type = ButtonTypes.PRIMARY, icon, value, clickHandler,
}: BaseButtonProps) {
  const componentClassnames = classnames('button', type, {
    [Classnames.IS_DISABLE]: isDisable,
  });

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isDisable && !isLoading) {
      clickHandler();
    }
  }

  function drawContent() {
    if (isLoading) return drawLoader();

    return (
      <>
        {drawButtonIcon()}
        <div className="button-value">{value}</div>
      </>
    );
  }

  function drawButtonIcon() {
    if (!icon) return '';

    return (
      <div className="button-icon">
        <Icon icon={icon} height={BUTTON_ICON_HEIGHT} />
      </div>
    );
  }

  function drawLoader() {
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
  }

  return (
    <div
      className={componentClassnames}
      data-class="click flex-center"
      onClick={handleClick}
    >
      {drawContent()}
    </div>
  );
}
