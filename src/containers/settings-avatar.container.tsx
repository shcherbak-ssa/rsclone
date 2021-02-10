import React, { useEffect, useState } from 'react';

import { AssetsService } from '../services/assets.service';
import { SettingsAvatarComponent, SettingsAvatarComponentProps } from '../components/settings-avatar.component';
import { UserDataLabels, SettingsSectionLabels } from '../constants';
import { useUserDraftState } from '../hooks/user-draft-state.hook';
import { userDraftController } from '../controllers/user-draft.controller';
import { UserDraftEvents } from '../constants/events.constants';
import { useAppLanguage } from '../hooks/app-language.hook';
import { ErrorLabels } from '../../common/constants';
import { useAvatarUserData } from '../hooks/avatar-user-data.hook';

export function SettingsAvatarContainer() {
  const userDraftAvatar = useUserDraftState(UserDataLabels.AVATAR);
  const settingsAvatarLanguage = useAppLanguage().settings[SettingsSectionLabels.USER].avatar;
  const {userAvatar, userFullname} = useAvatarUserData();

  const [loadedFilename, setLoadedFilename] = useState('');
  const assetsService: AssetsService = new AssetsService();

  const settingsAvatarComponentProps: SettingsAvatarComponentProps = {
    avatar: userDraftAvatar,
    userFullname,
    loadedFilename,
    settingsAvatarLanguage,
    loadFile,
    removeImageButtonClickHandler: (deleteUserAvatar: boolean) => {
      const nextAvatar = deleteUserAvatar ? '' : userAvatar;

      updateAvatar(nextAvatar);
      setLoadedFilename('');
    },
  };

  useEffect(() => {
    setLoadedFilename('');
  }, [userAvatar]);

  function isValidateFileType(userFile: any) {
    return assetsService.isValidUserAvatarFileType(userFile.name);
  }

  function loadFile(userFile: any, callback: Function) {
    if (!isValidateFileType(userFile)) {
      return userDraftController.emit(UserDraftEvents.SET_ERROR, {
        error: ErrorLabels.INVALID_FILE_TYPE,
        dataLabel: UserDataLabels.AVATAR,
      });
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(userFile);

    fileReader.onloadend = () => {
      updateAvatar(fileReader.result as string);
      setLoadedFilename(userFile.name);
      
      callback();
    };

    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  }

  function updateAvatar(value: string) {
    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, {
      dataLabel: UserDataLabels.AVATAR,
      value,
    });
  }

  return <SettingsAvatarComponent {...settingsAvatarComponentProps}/>
}
