import React, { useState } from 'react';
import classnames from 'classnames';
import './styles/action-icon.component.scss';

import { Icon } from '@iconify/react';
import { ActionIconLabels, Classnames } from '../constants/ui.constants';

export type ActionIconProps = {
  icon: object;
  width?: number;
  height?: number;
};

export type ActionIconComponentProps = {
  iconProps: ActionIconProps;
  description: string;
  clickHandler: Function;
  label: ActionIconLabels,
  activeActionIconLabel?: string,
};

export function ActionIconComponent({
  description, iconProps, clickHandler, label, activeActionIconLabel,
}: ActionIconComponentProps) {
  const [isActive, setIsActive] = useState(false);

  const componentClassnames = classnames('action-icon', {
    [Classnames.IS_ACTIVE]: getNextActiveState(),
  });

  function handleClick() {
    clickHandler();
    setIsActive(!isActive);
  }

  function getNextActiveState(): boolean {
    return activeActionIconLabel !== undefined ? label === activeActionIconLabel : isActive;
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
