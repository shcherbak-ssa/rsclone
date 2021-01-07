import React, { useRef, useState } from 'react';
import './settings-avatar.scss';

import { SettingsGroup, SettingsGroupProps } from '../../containers/settings-group/settings-group';
import { Avatar } from '../avatar/avatar';
import { Base, BaseButtonProps } from '../base';

const AVATAR_SIZE: number = 98;

export type SettingsAvatarProps = {
  avatarBlob?: ArrayBuffer,
  setAvatarBlob?: Function,
};

export function SettingsAvatar({avatarBlob, setAvatarBlob}: SettingsAvatarProps) {
  const fileInput = useRef(null);
  const [loadedFilename, setLoadedFilename] = useState('');

  const settingsGroupProps: SettingsGroupProps = {
    title: 'Avatar',
  };

  const removeFileButtonProps: BaseButtonProps = {
    value: 'Remove image',
    clickHandler: () => {
      setLoadedFilename('');
      setAvatarBlob('');
    },
  };

  function fileInputChangeHandle() {
    if (fileInput && fileInput.current) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileInput.current.files[0]);

      fileReader.onloadend = () => {
        setAvatarBlob(fileReader.result);
        setLoadedFilename(fileInput.current.files[0].name);
      };

      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
    }
  }

  function setSettingsAvatarDropContent() {
    if (loadedFilename) {
      return (
        <div className="settings-avatar-loaded-file" data-class="flex-center">
          <div className="settings-avatar-filename">{loadedFilename}</div>
          <Base.Button {...removeFileButtonProps} />
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
          <Avatar size={AVATAR_SIZE} avatarBlob={avatarBlob} />
        </label>
        <div className="settings-avatar-drop" data-class="flex-center">
          {setSettingsAvatarDropContent()}
        </div>
        <input type="file" id="user-avatar" ref={fileInput} onChange={fileInputChangeHandle} />
      </div>
    </SettingsGroup>
  );
}
