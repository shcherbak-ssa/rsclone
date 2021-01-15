import React from 'react';

import { HomepageSectionLabels } from '../constants';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';

export function SpacesContainer() {
  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SPACES,
    buttonClickHandler: () => {
      console.log('Add space');
    },
  };

  return (
    <HomepageContainer {...homepageContainerProps}>
      
    </HomepageContainer>
  );
}
