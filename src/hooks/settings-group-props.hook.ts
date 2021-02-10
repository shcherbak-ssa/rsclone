import { SettingsGroupComponentProps } from "../components/settings-group.component";
import { SettingsGroupLabels, SettingsSectionLabels } from "../constants";
import { useAppLanguage } from './app-language.hook';

export type SettingsGroupPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  groupLabel: SettingsGroupLabels,
};

export function useSettingsGroupProps({
  sectionLabel, groupLabel,
}: SettingsGroupPropsHookParams): SettingsGroupComponentProps {
  const appLanguage = useAppLanguage();

  const settingsGroupComponentProps: SettingsGroupComponentProps = {
    title: appLanguage.settings[sectionLabel].groups[groupLabel].title,
  };

  return settingsGroupComponentProps;
}
