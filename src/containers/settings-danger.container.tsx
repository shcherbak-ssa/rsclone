import React from 'react';

import { DeleteAccountPopupContainer } from './popups/delete-account-popup.container';
import { SettingsActionComponent, SettingsActionComponentProps } from '../components/settings-action.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsActionLabels, SettingsSectionLabels } from '../constants';
import { SettingsActionPropsHookParams, useSettingsActionProps } from '../hooks/settings-action-props.hook';
import { ButtonTypes, PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';
import { useAppLanguage } from '../hooks/app-language.hook';

export function SettingsDangerContainer() {
  const appLanguage = useAppLanguage();

  const settingsSectionComponentProps: SettingsSectionComponentProps = {
    title: appLanguage.settings[SettingsSectionLabels.DANGER].title
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

  const settingsActionComponentProps: SettingsActionComponentProps
    = useSettingsActionProps(settingsActionPropsHookParams);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <SettingsActionComponent {...settingsActionComponentProps}/>
      <DeleteAccountPopupContainer />
    </SettingsSectionComponent>
  );
}
