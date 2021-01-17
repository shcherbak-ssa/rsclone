import React from 'react';

import { Base, BaseInputProps } from '../components/base';
import { SettingsGroupComponent, SettingsGroupComponentProps } from '../components/settings-group.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsGroupLabels, SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsGroupPropsHookParams, useSettingsGroupProps } from '../hooks/settings-group-props.hook';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { useUserInputProps } from '../hooks/user-input-props.hook';
import { SettingsAvatarContainer } from './settings-avatar.container';

export function SettingsUserContainer() {
  const fullnameInputProps: BaseInputProps = useUserInputProps(UserDataLabels.FULLNAME);
  const usermameInputProps: BaseInputProps = useUserInputProps(UserDataLabels.USERNAME);

  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.USER,
    controlDataLabels: [
      UserDataLabels.FULLNAME,
      UserDataLabels.USERNAME,
      UserDataLabels.AVATAR,
    ],
  };
  const avatarGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.USER,
    groupLabel: SettingsGroupLabels.AVATAR,
  };
  const userDataGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.USER,
    groupLabel: SettingsGroupLabels.USER_DATA,
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);
  const avatarGroupComponentProps: SettingsGroupComponentProps
    = useSettingsGroupProps(avatarGroupPropsHookParams);
  const userDataGroupComponentProps: SettingsGroupComponentProps
    = useSettingsGroupProps(userDataGroupPropsHookParams);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <SettingsGroupComponent {...avatarGroupComponentProps}>
        <SettingsAvatarContainer />
      </SettingsGroupComponent>
      <SettingsGroupComponent {...userDataGroupComponentProps}>
        <Base.Input {...fullnameInputProps}/>
        <Base.Input {...usermameInputProps}/>
      </SettingsGroupComponent>
    </SettingsSectionComponent>
  );
}
