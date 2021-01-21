import React, { useState } from 'react';

import { spaceColors } from '../../common/data';
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
import { SpaceSettingsLogoComponent, SpaceSettingsLogoComponentProps } from '../components/space-settings-logo.component';
import { DropdownSpaceLogoComponent, DropdownSpaceLogoComponentProps } from '../components/dropdown-space-logo.component';

export function SpaceSettingsContainer() {
  const activeColor = useUserDraftState(UserDataLabels.SPACE_COLOR);
  const spaceLogo = useUserDraftState(UserDataLabels.SPACE_LOGO);
  const [isDropdownSpaceLogoOpen, setIsDropdownSpaceLogoOpen] = useState(false);

  const colorGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SPACE,
    groupLabel: SettingsGroupLabels.SPACE_COLOR,
  };

  const spaceNameInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel: UserDataLabels.SPACE_NAME,
  };

  const spaceSettingsLogoProps: SpaceSettingsLogoComponentProps = {
    activeColor,
    currentLogo: spaceLogo,
    clickHandler: () => {
      setIsDropdownSpaceLogoOpen(!isDropdownSpaceLogoOpen);
    },
  };

  const dropdownSpaceLogoProps: DropdownSpaceLogoComponentProps = {
    selectSpaceLogo: (selectedSpaceLogo: string) => {
      setIsDropdownSpaceLogoOpen(false);
      updateSpaceLogo(selectedSpaceLogo);
    },
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

  function drawDropdownSpaceLogo() {
    return isDropdownSpaceLogoOpen ? <DropdownSpaceLogoComponent {...dropdownSpaceLogoProps}/> : '';
  }

  function setActiveColor(nextColor: SpaceColors) {
    const updatedDraftData: UpdatedDraftValue = {
      value: nextColor,
      dataLabel: UserDataLabels.SPACE_COLOR,
    };

    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftData);
  }

  function updateSpaceLogo(selectedSpaceLogo: string) {
    const updatedDraftData: UpdatedDraftValue = {
      value: selectedSpaceLogo,
      dataLabel: UserDataLabels.SPACE_LOGO,
    };

    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftData);
  }

  return (
    <>
      <SpaceSettingsDataComponent>
        <SpaceSettingsLogoComponent {...spaceSettingsLogoProps}/>
        <Base.Input {...spaceNameInputProps}/>
      </SpaceSettingsDataComponent>
      {drawDropdownSpaceLogo()}
      <SettingsGroupComponent {...colorSettingsGroupProps}>
        <SpaceColorContainerComponent>
          {drawColors()}
        </SpaceColorContainerComponent>
      </SettingsGroupComponent>
    </>
  );
}
