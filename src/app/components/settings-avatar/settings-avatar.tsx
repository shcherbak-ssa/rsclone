import React from 'react';
import './settings-avatar.scss';

import { SettingsGroup, SettingsGroupProps } from '../../containers/settings-group/settings-group';
import { Avatar } from '../avatar/avatar';

const AVATAR_SIZE: number = 98;

export function SettingsAvatar() {
  const settingsGroupProps: SettingsGroupProps = {
    title: 'Avatar',
  };

  return (
    <SettingsGroup {...settingsGroupProps}>
      <div className="settings-avatar">
        <div className="settings-avatar-container" data-class="flex-center">
          <Avatar size={AVATAR_SIZE} />
        </div>
        <div className="settings-avatar-drop" data-class="flex-center">
          Drop your file here <span className="settings-avatar-link">or browse</span>
        </div>
      </div>
    </SettingsGroup>
  );
}
