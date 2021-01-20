import React from 'react';

import { spaceColors } from '../../common/data';
import { SpaceLogoTypes } from '../constants/ui.constants';
import { SpaceLogoComponent, SpaceLogoComponentProps } from '../components/space-logo.component';
import { SettingsGroupComponent, SettingsGroupComponentProps } from '../components/settings-group.component';
import { SettingsGroupLabels, SettingsSectionLabels, UserDataLabels } from '../constants';
import { useSettingsGroupProps, SettingsGroupPropsHookParams } from '../hooks/settings-group-props.hook';
import { SpaceSettingsDataComponent } from '../components/space-settings-data.component';
import { UserInputPropsHookParams, useUserInputProps } from '../hooks/user-input-props.hook';
import { Base, BaseInputProps } from '../components/base';
import { SpaceColorContainerComponent } from '../components/space-color-container.component';
import { SpaceColors } from '../../common/constants';
import { SpaceColorComponent, SpaceColorComponentProps } from '../components/space-color.component';
import { useUserDraftState } from '../hooks/user-draft-state.hook';
import { UpdatedDraftValue, userDraftController } from '../controllers/user-draft.controller';
import { UserDraftEvents } from '../constants/events.constants';

export function SpaceSettingsContainer() {
  const activeColor = useUserDraftState(UserDataLabels.SPACE_COLOR);

  const colorGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SPACE,
    groupLabel: SettingsGroupLabels.SPACE_COLOR,
  };

  const spaceNameInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel: UserDataLabels.SPACE_NAME,
  };

  const spaceLogoProps: SpaceLogoComponentProps = {
    logoType: SpaceLogoTypes.SETTINGS,
    color: activeColor,
  };

  const spaceNameInputProps: BaseInputProps = useUserInputProps(spaceNameInputPropsHookParams);

  const colorSettingsGroupProps: SettingsGroupComponentProps
    = useSettingsGroupProps(colorGroupPropsHookParams);

  function drawColors() {
    return spaceColors.map((color, index) => {
      const spaceColorProps: SpaceColorComponentProps = {
        color,
        activeColor,
        setActiveColor,
      };

      return <SpaceColorComponent key={index} {...spaceColorProps}/>;
    });
  }

  function setActiveColor(nextColor: SpaceColors) {
    const updatedDraftData: UpdatedDraftValue = {
      value: nextColor,
      dataLabel: UserDataLabels.SPACE_COLOR,
    };

    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftData);
  }

  return (
    <>
      <SpaceSettingsDataComponent>
        <SpaceLogoComponent {...spaceLogoProps}/>
        <Base.Input {...spaceNameInputProps}/>
      </SpaceSettingsDataComponent>
      <SettingsGroupComponent {...colorSettingsGroupProps}>
        <SpaceColorContainerComponent>
          {drawColors()}
        </SpaceColorContainerComponent>
      </SettingsGroupComponent>
    </>
  );
}
