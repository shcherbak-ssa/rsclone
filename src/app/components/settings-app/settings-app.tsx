import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-app.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsGroupProps, SettingsGroup } from '../../containers/settings-group';
import { Base, BaseSelectProps } from '../base';
import { storeSelectors } from '../../store';
import { SettingsEvents } from '../../constants';
import { UpdatedAppType } from '../../models/settings.model';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsTheme, SettingsThemeProps } from '../settings-theme/settings-theme';

import { languages } from '../../data/languages';
import { themes } from '../../data/themes';

export function SettingsApp() {
  const {language: currentLanguageLabel, theme: currentThemeLabel} = useSelector(storeSelectors.user.get());
  const [selectedLanguage, setSelectedLanguage] = useState(getSelectedValue(languages, currentLanguageLabel));
  const [selectedTheme, setSelectedTheme] = useState(getSelectedValue(themes, currentThemeLabel));
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'App',
    unsavedDataExist,
    saveButtonClickHanlder: () => {
      const updatedApp: UpdatedAppType = {
        language: selectedLanguage.label === currentLanguageLabel ? undefined : selectedLanguage.label,
        theme: selectedTheme.label === currentThemeLabel ? undefined : selectedTheme.label,
        callback: () => {
          setUnsavedDataExist(false);
        }
      };

      settingsController.emit(SettingsEvents.UPDATE_APP, updatedApp);
    },
  };

  const selectProps: BaseSelectProps = {
    placeholder: 'Language',
    selected: selectedLanguage,
    items: languages,
    updateSelectedItem: (label: string) => {
      if (label === selectedLanguage.label) return;
      
      setSelectedLanguage(getSelectedValue(languages, label));
      setUnsavedDataExist(
        label !== currentLanguageLabel || selectedTheme.label !== currentThemeLabel
      );
    },
  };

  const settingsGroupProps: SettingsGroupProps = {
    title: 'Theme',
  };

  const settingsThemeProps: SettingsThemeProps = {
    selected: selectedTheme.label,
    items: themes,
    selectItem: (label: string) => {
      if (label === selectedTheme.label) return;
      
      setSelectedTheme(getSelectedValue(themes, label));
      setUnsavedDataExist(
        label !== currentThemeLabel || selectedLanguage.label !== currentLanguageLabel
      );
    },
  };

  function getSelectedValue(from, label: string) {
    return from.find((item) => item.label === label);
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <Base.Select {...selectProps} />
      <SettingsGroup {...settingsGroupProps}>
        <SettingsTheme {...settingsThemeProps} />
      </SettingsGroup>
    </SettingsSection>
  );
}
