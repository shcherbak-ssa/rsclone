import saveIcon from '@iconify/icons-ic/baseline-save';

import { BaseButtonProps } from '../components/base';
import { SettingsSectionComponentProps } from "../components/settings-section.component";
import { SettingsSectionLabels } from '../constants';
import { useAppLanguage } from './app-language.hook';

export type SettingsSectionPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  saveHandler?: Function,
};

export function useSettingsSectionProps({
  sectionLabel, saveHandler,
}: SettingsSectionPropsHookParams): SettingsSectionComponentProps {
  const appLanguage = useAppLanguage();

  const settingsSectionComponentProps: SettingsSectionComponentProps = {
    title: appLanguage.settings[sectionLabel].title,
    ...getSaveButtonProps()
  };

  function getSaveButtonProps() {
    if (!saveHandler) return {};

    const saveButtonProps: BaseButtonProps = {
      icon: saveIcon,
      value: appLanguage.homepage.settings.saveButtonValue,
      clickHandler: saveHandler,
    };

    return {saveButtonProps};
  }

  return settingsSectionComponentProps;
}
