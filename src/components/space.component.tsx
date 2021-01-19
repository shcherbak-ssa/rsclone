import React from 'react';
import './styles/space.component.scss';

import { Icon } from '@iconify/react';
import threeDots from '@iconify/icons-bi/three-dots';

import { SpaceLogoComponent } from './space-logo.component';

const ICON_HEIGHT: number = 18;

export type SpaceComponentProps = {};

export function SpaceComponent({}: SpaceComponentProps) {
  return (
    <div className="space" data-class="click shadow">
      <div className="space-header">
        <SpaceLogoComponent />
        <div className="space-title">RS Clone</div>
      </div>
      <div className="space-line"></div>
      <div className="space-footer">
        <div className="space-date"></div>
        <div className="space-icon" data-class="click flex-center">
          <Icon icon={threeDots} height={ICON_HEIGHT}/>
        </div>
      </div>
    </div>
  );
}
