import React from 'react';
import classnames from 'classnames';
import './styles/space-logo.component.scss';

import { SpaceLogoTypes } from '../constants/ui.constants';

export type SpaceLogoComponentProps = {
  logoType?: SpaceLogoTypes,
};

export function SpaceLogoComponent({
  logoType = SpaceLogoTypes.SPACE,
}: SpaceLogoComponentProps) {
  const componentClassnames = classnames('space-logo', logoType);

  return (
    <div className={componentClassnames} data-class="flex-center"></div>
  );
}
