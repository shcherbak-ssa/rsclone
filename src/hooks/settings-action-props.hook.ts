import { SettingsActionComponentProps } from "../components/settings-action.component";
import { SettingsActionLabels, SettingsSectionLabels } from "../constants";
import { SelectAction } from "../types/select-item.types";
import { useAppLanguage } from './app-language.hook';

export type SettingsActionPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  actionLabel: SettingsActionLabels,
  buttonProps: any,
  selectAction?: SelectAction,
};

export function useSettingsActionProps({
  sectionLabel, actionLabel, buttonProps, selectAction
}: SettingsActionPropsHookParams): SettingsActionComponentProps {
  const appLanguage = useAppLanguage();
  const actionLanguage = appLanguage.settings[sectionLabel].actions[actionLabel];

  const settingsActionComponentProps: SettingsActionComponentProps = {
    title: actionLanguage.title,
    description: actionLanguage.description,
    buttonProps: {
      value: actionLanguage.buttonValue,
      ...buttonProps,
    },
    selectAction
  };

  return settingsActionComponentProps;
}
