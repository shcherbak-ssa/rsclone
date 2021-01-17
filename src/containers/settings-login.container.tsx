import React, { useState } from 'react';

import { Base, BaseInputProps } from '../components/base';
import { SettingsActionComponent, SettingsActionComponentProps } from '../components/settings-action.component';
import { SettingsGroupComponent, SettingsGroupComponentProps } from '../components/settings-group.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsActionLabels, SettingsGroupLabels, SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsActionPropsHookParams, useSettingsActionProps } from '../hooks/settings-action-props.hook';
import { SettingsGroupPropsHookParams, useSettingsGroupProps } from '../hooks/settings-group-props.hook';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { UserInputPropsHookParams, useUserInputProps } from '../hooks/user-input-props.hook';

export function SettingsLoginContainer() {
  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);

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
        setIsChangePasswordActive(true);
      }
    },
  };
  const passwordGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.LOGIN,
    groupLabel: SettingsGroupLabels.PASSWORD,
  };

  const emailInputProps: BaseInputProps = useUserInputProps(emailInputPropsHookParams);
  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);
  const settingsActionComponentProps: SettingsActionComponentProps
    = useSettingsActionProps(settingsActionPropsHookParams);
  const passwordGroupComponentProps: SettingsGroupComponentProps
    = useSettingsGroupProps(passwordGroupPropsHookParams);

  function drawPasswordContent() {
    if (isChangePasswordActive) {
      return (
        <SettingsGroupComponent {...passwordGroupComponentProps}>
          
        </SettingsGroupComponent>
      );
    } else {
      return <SettingsActionComponent {...settingsActionComponentProps}/>;
    }
  }

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <Base.Input {...emailInputProps}/>
      {drawPasswordContent()}
    </SettingsSectionComponent>
  );
}
