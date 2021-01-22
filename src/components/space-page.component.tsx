import React from 'react';
import './styles/space-page.component.scss';

import { Space } from '../../common/entities';
import { SpaceLogoComponent, SpaceLogoComponentProps } from './space-logo.component';
import { SpaceLogoTypes } from '../constants/ui.constants';
import { SpaceColors } from '../../common/constants';

export type SpacePageComponentProps = {
  space: Space | null,
};

export function SpacePageComponent({space}: SpacePageComponentProps) {
  if (space === null) return '';

  const spaceLogoProps: SpaceLogoComponentProps = {
    logoType: SpaceLogoTypes.PAGE,
    color: space.color as SpaceColors,
    logo: space.logo,
  };

  return (
    <div className="space-page">
      <div className="space-page-pages">
        <div className="space-page-header">
          <SpaceLogoComponent {...spaceLogoProps}/>
          <div className="space-page-title">{space.name}</div>
        </div>
      </div>
      <div className="space-page-editor"></div>
    </div>
  );
}
