import React, { useState } from 'react';

import {
  SettingsSectionCloseComponent,
  SettingsSectionCloseComponentProps,
} from '../components/settings-section-close.component';
import { HomepageSectionLabels, SettingsSectionLabels } from '../constants';
import { settingsSectionLabels } from '../data/settings.data';
import { HomepageContainer, HomepageContainerProps } from './homepage.container';
import { SettingsAppContainer } from './settings-app.container';
import { SettingsDangerContainer } from './settings-danger.container';
import { SettingsLoginContainer } from './settings-login.container';
import { SettingsShortcutsContainer } from './settings-shortcuts.container';
import { SettingsUserContainer } from './settings-user.container';

export function SettingsContainer() {
  const [activeSettingsSection, setActiveSettingsSection] = useState(SettingsSectionLabels.USER);

  const homepageContainerProps: HomepageContainerProps = {
    sectionLabel: HomepageSectionLabels.SETTINGS,
  };

  function drawSettingsSections() {
    return settingsSectionLabels.map((sectionLabel, index) => {
      return activeSettingsSection === sectionLabel
        ? getSectionComponent(sectionLabel, index)
        : getSectionCloseComponent(sectionLabel, index);
    });
  }

  function getSectionComponent(sectionLabel: SettingsSectionLabels, index: number) {
    switch (sectionLabel) {
      case SettingsSectionLabels.USER:
        return <SettingsUserContainer key={index}/>
      case SettingsSectionLabels.LOGIN:
        return <SettingsLoginContainer key={index}/>
      case SettingsSectionLabels.APP:
        return <SettingsAppContainer key={index}/>
      case SettingsSectionLabels.SHORTCUTS:
        return <SettingsShortcutsContainer key={index}/>
      case SettingsSectionLabels.DANGER:
        return <SettingsDangerContainer key={index}/>
    }
  }

  function getSectionCloseComponent(sectionLabel: SettingsSectionLabels, index: number) {
    const settingsSectionCloseComponentProps: SettingsSectionCloseComponentProps = {
      sectionLabel,
      setActiveSettingsSection,
    };

    return <SettingsSectionCloseComponent key={index} {...settingsSectionCloseComponentProps}/>
  }

  return (
    <HomepageContainer {...homepageContainerProps}>
      {drawSettingsSections()}
    </HomepageContainer>
  );
}
