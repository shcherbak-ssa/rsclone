import React from 'react';

import { HomepageSectionLabels } from '../constants';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';
import { SettingsAppContainer } from './settings-app.container';
import { SettingsDangerContainer } from './settings-danger.container';
import { SettingsLoginContainer } from './settings-login.container';
import { SettingsShortcutsContainer } from './settings-shortcuts.container';
import { SettingsUserContainer } from './settings-user.container';

export function SettingsContainer() {
  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SETTINGS,
  };

  return (
    <HomepageContainer {...homepageContainerProps}>
      <SettingsUserContainer />
      <SettingsLoginContainer />
      <SettingsAppContainer />
      <SettingsShortcutsContainer />
      <SettingsDangerContainer />
    </HomepageContainer>
  );
}
