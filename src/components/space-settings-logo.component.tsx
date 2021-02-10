import React from 'react';

import { SpaceColors } from '../../common/constants';
import { SpaceLogoTypes } from '../constants/ui.constants';
import { SpaceLogoComponent, SpaceLogoComponentProps } from './space-logo.component';

export type SpaceSettingsLogoComponentProps = {
  activeColor: SpaceColors,
  currentLogo: string,
  clickHandler: Function,
};

export function SpaceSettingsLogoComponent({
  activeColor, currentLogo, clickHandler,
}: SpaceSettingsLogoComponentProps) {
  const spaceLogoProps: SpaceLogoComponentProps = {
    logoType: SpaceLogoTypes.SETTINGS,
    color: activeColor,
    logo: currentLogo,
  };

  function handleClick() {
    clickHandler();
  }

  return (
    <div className="space-settings-logo" data-class="click" onClick={handleClick}>
      <SpaceLogoComponent {...spaceLogoProps}/>
    </div>
  );
}
