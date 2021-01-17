import React from 'react';

import { HomepageSectionLabels } from '../constants';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';
import { SettingsAppContainer } from './settings-app.container';
import { SettingsDangerContainer } from './settings-danger.container';
import { SettingsLoginContainer } from './settings-login.container';

export function SettingsContainer() {
  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SETTINGS,
  };

  return (
    <HomepageContainer {...homepageContainerProps}>
      <SettingsLoginContainer />
      <SettingsAppContainer />
      <SettingsDangerContainer />
    </HomepageContainer>
  );
}
