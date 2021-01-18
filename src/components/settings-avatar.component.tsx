import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames';
import './styles/settings-avatar.component.scss';

import { AvatarComponent, AvatarComponentProps } from './avatar.component';
import { Base, BaseButtonProps } from './base';
import { SETTINGS_AVATAR_SIZE } from '../constants';
import { InputState } from '../types/user-draft.types';
import { Classnames } from '../constants/ui.constants';

export type SettingsAvatarComponentProps = {
  avatar: InputState,
  userFullname: string,
  loadedFilename: string,
  settingsAvatarLanguage: any,
  loadFile: Function,
  removeImageButtonClickHandler: Function,
};

export function SettingsAvatarComponent({
  avatar, loadedFilename, userFullname,
  settingsAvatarLanguage, loadFile, removeImageButtonClickHandler,
}: SettingsAvatarComponentProps) {
  const fileInput = useRef(null);
  const onDrop = useCallback((files) => {
    loadFile(files[0], () => {});
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const componentClassnames = classnames('settings-avatar', {
    [Classnames.IS_DROP_ACTIVE]: isDragActive,
  });

  const avatarComponentProps: AvatarComponentProps = {
    size: SETTINGS_AVATAR_SIZE,
    avatarUrl: avatar.value,
    userFullname,
  };
  const deleteImageButtonProps: BaseButtonProps = {
    value: settingsAvatarLanguage.deleteImageButtonValue,
    clickHandler: () => {
      removeImageButtonClickHandler(false);
    },
  };
  const deleteAvatarButtonProps: BaseButtonProps = {
    value: settingsAvatarLanguage.deleteImageButtonValue,
    clickHandler: () => {
      removeImageButtonClickHandler(true);
    },
  };

  function handleFileInputChange() {
    if (fileInput && fileInput.current) {
      loadFile(fileInput.current.files[0], () => {
        fileInput.current.value = '';
      });
    }
  }

  function drawDeleteAvatarButton() {
    return avatar.value && !loadedFilename ? <Base.Button {...deleteAvatarButtonProps}/> : '';
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
          <div className="settings-avatar-drop-message">
            {settingsAvatarLanguage.dropText}
            <span className="settings-avatar-link">
              {settingsAvatarLanguage.dropLink}
            </span>
          </div>
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
      <div className={componentClassnames}>
        <div className="settings-avatar-container">
          <div className="settings-avatar-image" data-class="flex-center">
            <AvatarComponent {...avatarComponentProps}/>
          </div>
          {drawDeleteAvatarButton()}
        </div>
        <div className="settings-avatar-drop" data-class="flex-center" {...getRootProps()}>
          {drawSettingsAvatarDropContent()}
          {drawAvatarError()}
        </div>
        <input
          type="file"
          ref={fileInput}
          onChange={handleFileInputChange}
          {...getInputProps()}
        />
      </div>
    </>
  );
}
