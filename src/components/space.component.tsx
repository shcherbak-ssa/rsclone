import React from 'react';
import classnames from 'classnames';
import './styles/space.component.scss';

import { Icon } from '@iconify/react';
import threeDots from '@iconify/icons-bi/three-dots';

import { SpaceLogoComponent, SpaceLogoComponentProps } from './space-logo.component';
import { Classnames, ICON_18_HEIGHT } from '../constants/ui.constants';
import { SpaceColors } from '../../common/constants';
import { Space } from '../../common/entities';

export type SpaceComponentProps = {
  space: Space,
};

export function SpaceComponent({space}: SpaceComponentProps) {
  const spaceLogoProps: SpaceLogoComponentProps = {
    color: space.color as SpaceColors,
  };

  const spaceIconClassnames = classnames('space-icon', {});

  return (
    <div className="space" data-class="click shadow">
      <div className="space-header">
        <SpaceLogoComponent {...spaceLogoProps}/>
        <div className="space-title">{space.name}</div>
      </div>
      <div className="space-line"></div>
      <div className="space-footer">
        <div className="space-date"></div>
        <div className={spaceIconClassnames} data-class="click flex-center">
          <Icon icon={threeDots} height={ICON_18_HEIGHT}/>
        </div>
      </div>
    </div>
  );
}
