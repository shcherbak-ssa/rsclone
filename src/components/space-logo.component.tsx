import React from 'react';
import classnames from 'classnames';
import './styles/space-logo.component.scss';

import { SpaceLogoTypes } from '../constants/ui.constants';
import { SpaceColors } from '../../common/constants';
import { AssetsService } from '../services/assets.service';

export type SpaceLogoComponentProps = {
  logoType?: SpaceLogoTypes,
  color: SpaceColors,
  logo: string,
};

export function SpaceLogoComponent({
  logoType = SpaceLogoTypes.SPACE, color, logo,
}: SpaceLogoComponentProps) {
  const componentClassnames = classnames('space-logo', logoType);

  function setBackgroundColorStyle() {
    return AssetsService.createHexBackgroundColorStyle(color);
  }

  return (
    <div 
      className={componentClassnames} 
      data-class="flex-center"
      style={setBackgroundColorStyle()}
    >
      {logo}
    </div>
  );
}
