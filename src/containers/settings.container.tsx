import React from 'react';

import { HomepageSectionLabels } from '../constants';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';
import { SettingsAppContainer } from './settings-app.container';
import { SettingsDangerContainer } from './settings-danger.container';

export function SettingsContainer() {
  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SETTINGS,
  };

  return (
    <HomepageContainer {...homepageContainerProps}>
      <SettingsAppContainer />
      <SettingsDangerContainer />
    </HomepageContainer>
  );
}
