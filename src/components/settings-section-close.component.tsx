import React from 'react';

import { SettingsSectionTitleComponent } from './settings-section-title.component';
import { useAppLanguage } from '../hooks/app-language.hook';

export type SettingsSectionCloseComponentProps = {
  sectionLabel: string,
  setActiveSettingsSection: Function,
};

export function SettingsSectionCloseComponent({
  sectionLabel, setActiveSettingsSection,
}: SettingsSectionCloseComponentProps) {
  const appLanguage = useAppLanguage();

  function handleClick() {
    setActiveSettingsSection(sectionLabel);
  }

  return (
    <div
      className="settings-section settings-section-close"
      data-class="click shadow"
      onClick={handleClick}
    >
      <SettingsSectionTitleComponent title={appLanguage.settings[sectionLabel].title} />
    </div>
  );
}
