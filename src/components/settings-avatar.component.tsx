import React, { useRef } from 'react';
import './styles/settings-avatar.component.scss';

import { AvatarComponent, AvatarComponentProps } from './avatar.component';
import { Base, BaseButtonProps } from './base';
import { SettingsSectionLabels, SETTINGS_AVATAR_SIZE } from '../constants';
import { InputState } from '../types/user-draft.types';
import { useAppLanguage } from '../hooks/app-language.hook';

export type SettingsAvatarComponentProps = {
  avatar: InputState,
  userFullname: string,
  loadedFilename: string,
  loadFile: Function,
  removeImageButtonClickHanlder: Function,
};

export function SettingsAvatarComponent({
  avatar, loadedFilename, userFullname, loadFile, removeImageButtonClickHanlder,
}: SettingsAvatarComponentProps) {
  const fileInput = useRef(null);
  const settingsAvatarLanguage = useAppLanguage().settings[SettingsSectionLabels.USER].avatar;

  const avatarComponentProps: AvatarComponentProps = {
    size: SETTINGS_AVATAR_SIZE,
    avatarLink: avatar.value,
    userFullname,
  };

  const deleteImageButtonProps: BaseButtonProps = {
    value: settingsAvatarLanguage.deleteImageButtonValue,
    clickHandler: removeImageButtonClickHanlder,
  };

  function handleFileInputChange() {
    if (fileInput && fileInput.current) {
      loadFile(fileInput.current.files[0], () => {
        fileInput.current.value = '';
      });
    }
  }

  function drawSettingsAvatarDropContent() {
    if (loadedFilename) {
      return (
        <div className="settings-avatar-loaded-file" data-class="flex-center">
          <div className="settings-avatar-filename">{loadedFilename}</div>
          <Base.Button {...deleteImageButtonProps}/>
        </div>
      );
    } else {
      return (
        <>
          {settingsAvatarLanguage.dropText}
          <label htmlFor="user-avatar" className="settings-avatar-link">
            {settingsAvatarLanguage.dropLink}
          </label>
          {avatar.value ? <Base.Button {...deleteImageButtonProps}/> : ''}
        </>
      );
    }
  }

  function drawAvatarError() {
    if (!avatar.error) return '';

    return (
      <div className="settings-avatar-error">
        {settingsAvatarLanguage.errors[avatar.error]}
      </div>
    );
  }

  return (
    <>
      <div className="settings-avatar">
        <label
          htmlFor="user-avatar"
          className="settings-avatar-container"
          data-class="flex-center click"
        >
          <AvatarComponent {...avatarComponentProps}/>
        </label>
        <div className="settings-avatar-drop" data-class="flex-center">
          {drawSettingsAvatarDropContent()}
        </div>
        <input
          type="file"
          id="user-avatar"
          ref={fileInput}
          onChange={handleFileInputChange}
        />
      </div>
      {drawAvatarError()}
    </>
  );
}
