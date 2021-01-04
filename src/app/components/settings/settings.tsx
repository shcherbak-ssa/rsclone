import React from 'react';
import './settings.scss';

import { HomepageSectionProps, HomepageSection } from '../../containers/homepage-section';
import { SettingsUser } from '../settings-user';
import { SettingsLogin } from '../settings-login';
import { SettingsApp } from '../settings-app';

export function Settings() {
  const homepageSectionProps: HomepageSectionProps = {
    title: 'Settings',
  };

  return (
    <HomepageSection {...homepageSectionProps}>
      <div className="settings" data-class="flex-column">
        <SettingsUser />
        <SettingsLogin />
        <SettingsApp />
      </div>
    </HomepageSection>
  );
}
