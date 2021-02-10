import React from 'react';

import { SettingsActionComponent, SettingsActionComponentProps } from '../components/settings-action.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, SettingsActionLabels } from '../constants';
import { SpacesEvents } from '../constants/events.constants';
import { ButtonTypes, PopupNames } from '../constants/ui.constants';
import { spacesController } from '../controllers/spaces.controller';
import { useAppLanguage } from '../hooks/app-language.hook';
import { SettingsActionPropsHookParams, useSettingsActionProps } from '../hooks/settings-action-props.hook';
import { PopupService } from '../services/popup.service';
import { DeletePopupContainer, DeletePopupContainerProps } from './popups/delete-popup.container';

export function SpacePageDeleteContainer() {
  const appLanguage = useAppLanguage();

  const settingsSectionComponentProps: SettingsSectionComponentProps = {
    title: appLanguage.settings[SettingsSectionLabels.DELETE_SPACE].title
  };

  const settingsActionPropsHookParams: SettingsActionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.DELETE_SPACE,
    actionLabel: SettingsActionLabels.DELETE_SPACE,
    buttonProps: {
      type: ButtonTypes.DANGER,
      clickHandler: () => {
        const popupService: PopupService = new PopupService();
        popupService.openPopup(PopupNames.DELETE_SPACE);
      }
    },
  };

  const settingsActionComponentProps: SettingsActionComponentProps
    = useSettingsActionProps(settingsActionPropsHookParams);

  const deleteSpacePopupProps: DeletePopupContainerProps = {
    popupName: PopupNames.DELETE_SPACE,
    controller: spacesController,
    controllerEvent: SpacesEvents.DELETE_SPACE,
  };

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <SettingsActionComponent {...settingsActionComponentProps}/>
      <DeletePopupContainer {...deleteSpacePopupProps}/>
    </SettingsSectionComponent>
  );
}
