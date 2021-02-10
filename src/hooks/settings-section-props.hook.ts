import { useState } from 'react';
import saveIcon from '@iconify/icons-ic/baseline-save';

import { BaseButtonProps } from '../components/base';
import { SettingsSectionComponentProps } from "../components/settings-section.component";
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { useAppLanguage } from './app-language.hook';
import { UpdatedDataService } from '../services/updated-data.service';
import { UpdatesControllerHookParams, useUpdatesController } from './updates-controller.hook';
import { UpdateUserData, userController } from '../controllers/user.controller';
import { AvatarEvents, UserEvents } from '../constants/events.constants';
import { avatarController, Avatar } from '../controllers/avatar.controller';

export type SettingsSectionPropsHookParams = {
  sectionLabel: SettingsSectionLabels,
  controlDataLabels: UserDataLabels[],
  savingFinishHandler?: Function,
  saveUpdatedData?: Function,
};

export function useSettingsSectionProps({
  sectionLabel, controlDataLabels, savingFinishHandler, saveUpdatedData,
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

        if (updatedData.has(UserDataLabels.AVATAR)) {
          const avatarFile: string = updatedData.get(UserDataLabels.AVATAR);
          updatedData.delete(UserDataLabels.AVATAR);

          const avatar: Avatar = {
            avatarFile,
            callback: updateData,
          };

          avatarController.emit(AvatarEvents.CHANGE_AVATAR, avatar);
        } else {
          updateData();
        }
      },
    };

    return {saveButtonProps};
  }

  function updateData() {
    if (!updatedData.isUpdatesExist()) return finishSaving(true);

    if (saveUpdatedData) {
      return saveUpdatedData(updatedData.get(), finishSaving);
    }

    const updatedUserData: UpdateUserData = {
      updatedData: updatedData.get(),
      callback: finishSaving,
    };

    userController.emit(UserEvents.UPDATE_USER, updatedUserData);
  }

  function finishSaving(isSuccess: boolean) {
    setIsSavingActive(false)
   
    if (savingFinishHandler) {
      savingFinishHandler(isSuccess);
    }
  }

  return settingsSectionComponentProps;
}
