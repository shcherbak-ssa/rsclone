import { useState } from 'react';
import saveIcon from '@iconify/icons-ic/baseline-save';

import { BaseButtonProps } from '../components/base';
import { SettingsSectionComponentProps } from "../components/settings-section.component";
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { useAppLanguage } from './app-language.hook';
import { UpdatedDataService } from '../services/updated-data.service';
import { UpdatesControllerHookParams, useUpdatesController } from './updates-controller.hook';
import { UpdateUserData, userController } from '../controllers/user.controller';
import { UserEvents } from '../constants/events.constants';

export type SettingsSectionPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  controlDataLabels: UserDataLabels[],
  savingFinishHandler?: Function,
};

export function useSettingsSectionProps({
  sectionLabel, controlDataLabels, savingFinishHandler,
}: SettingsSectionPropsHookParams): SettingsSectionComponentProps {
  const [isSavingActive, setIsSavingActive] = useState(false);
  const appLanguage = useAppLanguage();

  const updatedData: UpdatedDataService = new UpdatedDataService();
  const updatesControllerHookParams: UpdatesControllerHookParams = {
    controlDataLabels,
    updatedData,
  };

  const isUpdatesExist: boolean = useUpdatesController(updatesControllerHookParams);

  const settingsSectionComponentProps: SettingsSectionComponentProps = {
    title: appLanguage.settings[sectionLabel].title,
    isSavingActive,
    ...getSaveButtonProps()
  };

  function getSaveButtonProps() {
    if (!isUpdatesExist) return {};

    const saveButtonProps: BaseButtonProps = {
      isLoading: isSavingActive,
      icon: saveIcon,
      value: appLanguage.homepage.settings.saveButtonValue,
      clickHandler: () => {
        setIsSavingActive(true);

        const updatedUserData: UpdateUserData = {
          updatedData: updatedData.get(),
          callback: (isSuccess: boolean) => {
            setIsSavingActive(false)
            
            if (savingFinishHandler) {
              savingFinishHandler(isSuccess);
            }
          },
        };

        userController.emit(UserEvents.UPDATE_USER, updatedUserData);
      },
    };

    return {saveButtonProps};
  }

  return settingsSectionComponentProps;
}
