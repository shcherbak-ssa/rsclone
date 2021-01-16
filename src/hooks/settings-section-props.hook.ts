import { useState } from 'react';
import saveIcon from '@iconify/icons-ic/baseline-save';

import { BaseButtonProps } from '../components/base';
import { SettingsSectionComponentProps } from "../components/settings-section.component";
import { SettingsSectionLabels } from '../constants';
import { useAppLanguage } from './app-language.hook';

export type SettingsSectionPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  saveButton?: {
    saveHandler: Function,
    isUpdatesExist: boolean,
  },
};

export function useSettingsSectionProps({
  sectionLabel, saveButton,
}: SettingsSectionPropsHookParams): SettingsSectionComponentProps {
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);
  const appLanguage = useAppLanguage();

  const settingsSectionComponentProps: SettingsSectionComponentProps = {
    title: appLanguage.settings[sectionLabel].title,
    ...getSaveButtonProps()
  };

  function getSaveButtonProps() {
    if (!saveButton || !saveButton.isUpdatesExist) return {};

    const saveButtonProps: BaseButtonProps = {
      isLoading: isSaveButtonLoading,
      icon: saveIcon,
      value: appLanguage.homepage.settings.saveButtonValue,
      clickHandler: () => {
        setIsSaveButtonLoading(true);
        saveButton.saveHandler(() => setIsSaveButtonLoading(false));
      },
    };

    return {saveButtonProps};
  }

  return settingsSectionComponentProps;
}
