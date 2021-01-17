import React, { useState } from 'react';

import { AssetsService } from '../services/assets.service';
import { SettingsAvatarComponent, SettingsAvatarComponentProps } from '../components/settings-avatar.component';
import { UserDataLabels } from '../constants';
import { useUserDraftState } from '../hooks/user-draft-state.hook';
import { useUserState } from '../hooks/user-state.hook';
import { userDraftController } from '../controllers/user-draft.controller';
import { UserDraftEvents } from '../constants/events.constants';
import { ErrorLabels } from '../../common/constants';

export function SettingsAvatarContainer() {
  const avatar = useUserDraftState(UserDataLabels.AVATAR);
  const userFullname = useUserState(UserDataLabels.FULLNAME);

  const [loadedFilename, setLoadedFilename] = useState('');
  const assetsService: AssetsService = new AssetsService();

  const settingsAvatarComponentProps: SettingsAvatarComponentProps = {
    avatar,
    userFullname,
    loadedFilename,
    loadFile,
    removeImageButtonClickHanlder: () => {
      updateAvatar('');
      setLoadedFilename('');
    },
  };

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
