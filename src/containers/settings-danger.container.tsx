import React from 'react';

import { DeleteAccountPopupContainer } from './popups/delete-account-popup.container';
import { SettingsActionComponent, SettingsActionComponentProps } from '../components/settings-action.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsActionLabels, SettingsSectionLabels } from '../constants';
import { SettingsActionPropsHookParams, useSettingsActionProps } from '../hooks/settings-action-props.hook';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { ButtonTypes, PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';

export function SettingsDangerContainer() {
  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.DANGER
  };
  const settingsActionPropsHookParams: SettingsActionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.DANGER,
    actionLabel: SettingsActionLabels.DELETE_ACCOUNT,
    buttonProps: {
      type: ButtonTypes.DANGER,
      clickHandler: () => {
        const popupService: PopupService = new PopupService();
        popupService.openPopup(PopupNames.DELETE_ACCOUNT);
      }
    },
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);
  const settingsActionComponentProps: SettingsActionComponentProps
    = useSettingsActionProps(settingsActionPropsHookParams);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <SettingsActionComponent {...settingsActionComponentProps}/>
      <DeleteAccountPopupContainer />
    </SettingsSectionComponent>
  );
}
