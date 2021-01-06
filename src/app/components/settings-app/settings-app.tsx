import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-app.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsGroupProps, SettingsGroup } from '../../containers/settings-group';
import { Base, BaseSelectProps } from '../base';
import { storeSelectors } from '../../store';
import { languages } from '../../constants';

export function SettingsApp() {
  const {language} = useSelector(storeSelectors.user.get());
  const [selectedLanguage, setSelectedLanguage] = useState(getSelectedLanguage(language));
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'App',
    unsavedDataExist,
    saveButtonClickHanlder: () => {},
  };

  const selectProps: BaseSelectProps = {
    placeholder: 'Language',
    selected: selectedLanguage,
    items: languages,
    updateSelectedItem: (label: string) => {
      if (label === selectedLanguage.label) return;
      
      setSelectedLanguage(getSelectedLanguage(label));
      setUnsavedDataExist(label !== language);
    },
  };

  const settingsGroupProps: SettingsGroupProps = {
    title: 'Theme',
  };

  function getSelectedLanguage(currentLanguageLabel) {
    return languages.find((lang) => lang.label === currentLanguageLabel)
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <Base.Select {...selectProps} />
      <SettingsGroup {...settingsGroupProps}></SettingsGroup>
    </SettingsSection>
  );
}
