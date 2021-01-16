import { SettingsActionComponentProps } from "../components/settings-action.component";
import { SettingsActionLabels, SettingsSectionLabels } from "../constants";
import { SelectAction } from "../types/select-item.types";
import { useAppLanguage } from './app-language.hook';

export type SettingsActionPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  actionLabel: SettingsActionLabels,
  buttonValue?: string,
  buttonClickHandler: Function,
  selectAction?: SelectAction,
};

export function useSettingsActionProps({
  sectionLabel, actionLabel, buttonValue, buttonClickHandler, selectAction
}: SettingsActionPropsHookParams): SettingsActionComponentProps {
  const appLanguage = useAppLanguage();
  const actionLanguage = appLanguage.settings[sectionLabel].actions[actionLabel];

  const settingsActionComponentProps: SettingsActionComponentProps = {
    title: actionLanguage.title,
    description: actionLanguage.description,
    buttonProps: {
      value: buttonValue || actionLanguage.buttonValue,
      clickHandler: buttonClickHandler,
    },
    selectAction
  };

  return settingsActionComponentProps;
}
