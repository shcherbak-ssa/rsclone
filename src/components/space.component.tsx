import React from 'react';
import threeDots from '@iconify/icons-bi/three-dots';
import { Icon } from '@iconify/react';
import './styles/space.component.scss';

const ICON_HEIGHT: number = 18;

export type SpaceComponentProps = {};

export function SpaceComponent({}: SpaceComponentProps) {
  return (
    <div className="space" data-class="click shadow">
      <div className="space-header">
        <div className="space-logo" data-class="flex-center"></div>
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