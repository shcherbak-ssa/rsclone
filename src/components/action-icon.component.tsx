import React from 'react';
import './styles/action-icon.component.scss';
import { Icon } from '@iconify/react';

export type ActionIconProps = {
  icon: object;
  width?: number;
  height?: number;
};

export type ActionIconComponentProps = {
  iconProps: ActionIconProps;
  description: string;
  clickHandler: () => void;
};

export function ActionIconComponent({
  description, iconProps, clickHandler
}: ActionIconComponentProps) {
  function drawDescription() {
    return description ? <div className="action-icon-description">{description}</div> : '';
  }

  return (
    <div className="action-icon" data-class="click flex-center" onClick={clickHandler}>
      <Icon {...iconProps} />
      {drawDescription()}
    </div>
  );
}
