import React from 'react';

import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';

export function SettingsLoginContainer() {
  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.LOGIN,
    controlDataLabels: [UserDataLabels.EMAIL],
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      
    </SettingsSectionComponent>
  );
}
