import React from 'react';

import { Base, BaseInputProps } from '../components/base';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { useUserInputProps } from '../hooks/user-input-props.hook';

export function SettingsLoginContainer() {
  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.LOGIN,
    controlDataLabels: [UserDataLabels.EMAIL],
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);

  const emailInputProps: BaseInputProps = useUserInputProps(UserDataLabels.EMAIL);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <Base.Input {...emailInputProps}/>
    </SettingsSectionComponent>
  );
}
