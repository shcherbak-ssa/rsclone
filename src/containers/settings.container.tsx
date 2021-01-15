import React from 'react';

import { HomepageSectionLabels } from '../constants';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';

export function SettingsContainer() {
  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SETTINGS,
  };

  return (
    <HomepageContainer {...homepageContainerProps}>
      
    </HomepageContainer>
  );
}
