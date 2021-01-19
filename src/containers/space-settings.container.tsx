import React from 'react';

import { SpaceLogoTypes } from '../constants/ui.constants';
import { SpaceLogoComponent, SpaceLogoComponentProps } from '../components/space-logo.component';
import { SettingsGroupComponent, SettingsGroupComponentProps } from '../components/settings-group.component';
import { SettingsGroupLabels, SettingsSectionLabels, UserDataLabels } from '../constants';
import { useSettingsGroupProps, SettingsGroupPropsHookParams } from '../hooks/settings-group-props.hook';
import { SpaceSettingsDataComponent } from '../components/space-settings-data.component';
import { UserInputPropsHookParams, useUserInputProps } from '../hooks/user-input-props.hook';
import { Base, BaseInputProps } from '../components/base';

export function SpaceSettingsContainer() {
  const colorGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SPACE,
    groupLabel: SettingsGroupLabels.SPACE_COLOR,
  };
  const spaceNameInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel: UserDataLabels.SPACE_NAME,
  };

  const spaceLogoProps: SpaceLogoComponentProps = {
    logoType: SpaceLogoTypes.SETTINGS,
  };

  const spaceNameInputProps: BaseInputProps = useUserInputProps(spaceNameInputPropsHookParams);

  const colorSettingsGroupProps: SettingsGroupComponentProps
    = useSettingsGroupProps(colorGroupPropsHookParams);

  return (
    <>
      <SpaceSettingsDataComponent>
        <SpaceLogoComponent {...spaceLogoProps}/>
        <Base.Input {...spaceNameInputProps}/>
      </SpaceSettingsDataComponent>
      <SettingsGroupComponent {...colorSettingsGroupProps}/>
    </>
  );
}
