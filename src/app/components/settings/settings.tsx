import React, { useEffect } from 'react';
import './settings.scss';

import { HomepageSectionProps, HomepageSection } from '../../containers/homepage-section';
import { SettingsUser } from '../settings-user';
import { SettingsLogin } from '../settings-login';
import { SettingsApp } from '../settings-app';
import { SettingsShortcuts } from '../settings-shortcuts';
import { SettingsDanger } from '../settings-danger';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsEvents } from '../../constants';

export function Settings() {
  const homepageSectionProps: HomepageSectionProps = {
    title: 'Settings',
  };

  useEffect(() => {
    settingsController.emit(SettingsEvents.INIT_SETTINGS);

    return () => {
      settingsController.emit(SettingsEvents.REMOVE_SETTINGS);
    };
  }, []);

  return (
    <HomepageSection {...homepageSectionProps}>
      <div className="settings" data-class="flex-column">
        <SettingsUser />
        <SettingsLogin />
        <SettingsApp />
        <SettingsShortcuts />
        <SettingsDanger />
      </div>
    </HomepageSection>
  );
}
