import React from 'react';
import './styles/space.component.scss';

import { Icon } from '@iconify/react';
import threeDots from '@iconify/icons-bi/three-dots';

import { SpaceLogoComponent, SpaceLogoComponentProps } from './space-logo.component';
import { ICON_18_HEIGHT } from '../constants/ui.constants';
import { SpaceColors } from '../../common/constants';

export type SpaceComponentProps = {
  id: string,
  name: string,
  color: string,
  logo: string,
};

export function SpaceComponent({
  id, name, color, logo,
}: SpaceComponentProps) {
  const spaceLogoProps: SpaceLogoComponentProps = {
    color: color as SpaceColors,
  };

  return (
    <div className="space" data-class="click shadow">
      <div className="space-header">
        <SpaceLogoComponent {...spaceLogoProps}/>
        <div className="space-title">{name}</div>
      </div>
      <div className="space-line"></div>
      <div className="space-footer">
        <div className="space-date"></div>
        <div className="space-icon" data-class="click flex-center">
          <Icon icon={threeDots} height={ICON_18_HEIGHT}/>
        </div>
      </div>
    </div>
  );
}
