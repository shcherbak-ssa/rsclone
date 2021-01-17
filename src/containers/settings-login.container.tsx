import React from 'react';

import { Base, BaseInputProps } from '../components/base';
import { SettingsActionComponent, SettingsActionComponentProps } from '../components/settings-action.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsActionLabels, SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsActionPropsHookParams, useSettingsActionProps } from '../hooks/settings-action-props.hook';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { UserInputPropsHookParams, useUserInputProps } from '../hooks/user-input-props.hook';

export function SettingsLoginContainer() {
  const emailInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel: UserDataLabels.EMAIL,
  };
  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.LOGIN,
    controlDataLabels: [UserDataLabels.EMAIL],
  };
  const settingsActionPropsHookParams: SettingsActionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.LOGIN,
    actionLabel: SettingsActionLabels.CHANGE_PASSWORD,
    buttonProps: {
      clickHandler: () => {
        console.log('change password');
      }
    },
  };

  const emailInputProps: BaseInputProps = useUserInputProps(emailInputPropsHookParams);
  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);
  const settingsActionComponentProps: SettingsActionComponentProps
    = useSettingsActionProps(settingsActionPropsHookParams);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <Base.Input {...emailInputProps}/>
      <SettingsActionComponent {...settingsActionComponentProps}/>
    </SettingsSectionComponent>
  );
}
