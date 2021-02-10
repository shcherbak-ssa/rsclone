import React from 'react';

import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { SpaceSettingsContainer } from './space-settings.container';
import { UpdatedSpaceData, spacesController } from '../controllers/spaces.controller';
import { SpacesEvents } from '../constants/events.constants';
import { SpacePageDeleteContainer } from './space-page-delete.container';

export function SpacePageSettingsContainer() {
  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SPACE,
    controlDataLabels: [
      UserDataLabels.SPACE_NAME,
      UserDataLabels.SPACE_COLOR,
      UserDataLabels.SPACE_LOGO,
    ],
    saveUpdatedData: (updatedData: any, finishSaving: Function) => {
      const updatedSpace: UpdatedSpaceData = {
        updatedData,
        callback: finishSaving,
      };

      spacesController.emit(SpacesEvents.UPDATE_SPACE, updatedSpace);
    },
  };

  const settingsSectionProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);

  return (
    <>
      <SettingsSectionComponent {...settingsSectionProps}>
        <SpaceSettingsContainer />
      </SettingsSectionComponent>
      <SpacePageDeleteContainer />
    </>
  );
}
