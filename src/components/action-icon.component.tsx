import React, { useState } from 'react';
import classnames from 'classnames';
import './styles/action-icon.component.scss';

import { Icon } from '@iconify/react';
import { Classnames } from '../constants/ui.constants';

export type ActionIconProps = {
  icon: object;
  width?: number;
  height?: number;
};

export type ActionIconComponentProps = {
  iconProps: ActionIconProps;
  description: string;
  clickHandler: Function;
};

export function ActionIconComponent({
  description, iconProps, clickHandler
}: ActionIconComponentProps) {
  const [isActive, setIsActive] = useState(false);

  const componentClassnames = classnames('action-icon', {
    [Classnames.IS_ACTIVE]: isActive,
  });

  function handleClick() {
    clickHandler();
    setIsActive(!isActive);
  }

  function drawDescription() {
    return description ? <div className="action-icon-description">{description}</div> : '';
  }

  return (
    <div
      className={componentClassnames}
      data-class="click flex-center"
      onClick={handleClick}
    >
      <Icon {...iconProps} />
      {drawDescription()}
    </div>
  );
}
