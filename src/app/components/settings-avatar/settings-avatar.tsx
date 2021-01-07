import React, { useRef, useState } from 'react';
import './settings-avatar.scss';

import { SettingsGroup, SettingsGroupProps } from '../../containers/settings-group/settings-group';
import { Avatar } from '../avatar/avatar';
import { Base, BaseButtonProps } from '../base';
import { AssetsService } from '../../../services/assets.service';

const AVATAR_SIZE: number = 98;

export type SettingsAvatarProps = {
  avatarArrayBuffer: string | null,
  loadedFilename: string,
  setAvatarArrayBuffer: Function,
  setLoadedFilename: Function,
  setAvatarUserFile: Function,
};

export function SettingsAvatar({
  avatarArrayBuffer,
  loadedFilename,
  setAvatarArrayBuffer,
  setLoadedFilename,
  setAvatarUserFile,
}: SettingsAvatarProps) {
  const fileInput = useRef(null);
  const [loadAvatarError, setLoadAvatarError] = useState('');

  const settingsGroupProps: SettingsGroupProps = {
    title: 'Avatar',
  };

  const removeImageButtonProps: BaseButtonProps = {
    value: 'Remove image',
    clickHandler: () => {
      setLoadedFilename('');
      setAvatarArrayBuffer(null);
      setAvatarUserFile(null);
    },
  };

  function fileInputChangeHandle() {
    if (fileInput && fileInput.current) {
      const userFile = fileInput.current.files[0];

      if (!isValidateFileType(userFile)) {
        return setLoadAvatarError('Invalid file type');
      }

      setLoadAvatarError('');
      setAvatarUserFile(userFile);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(userFile);

      fileReader.onloadend = () => {
        setAvatarArrayBuffer(fileReader.result);
        setLoadedFilename(userFile.name);
        
        fileInput.current.value = '';
      };

      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
    }
  }

  function isValidateFileType(userFile: any) {
    const assetsService = new AssetsService();
    return assetsService.isValidUserAvatarFileType(userFile.name);
  }

  function setSettingsAvatarDropContent() {
    if (loadedFilename) {
      return (
        <div className="settings-avatar-loaded-file" data-class="flex-center">
          <div className="settings-avatar-filename">{loadedFilename}</div>
          <Base.Button {...removeImageButtonProps} />
        </div>
      );
    } else {
      return (
        <>
          Drop your file here
          <label htmlFor="user-avatar" className="settings-avatar-link">or browse</label>
        </>
      );
    }
  }

  return (
    <SettingsGroup {...settingsGroupProps}>
      <div className="settings-avatar">
        <label
          htmlFor="user-avatar"
          className="settings-avatar-container"
          data-class="flex-center click"
        >
          <Avatar size={AVATAR_SIZE} avatarArrayBuffer={avatarArrayBuffer} />
        </label>
        <div className="settings-avatar-drop" data-class="flex-center">
          {setSettingsAvatarDropContent()}
        </div>
        <input type="file" id="user-avatar" ref={fileInput} onChange={fileInputChangeHandle} />
      </div>
      {loadAvatarError ? <div className="settings-avatar-error">{loadAvatarError}</div> : ''}
    </SettingsGroup>
  );
}
