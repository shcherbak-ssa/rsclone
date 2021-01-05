import React from 'react';
import './settings-action.scss';

import { Base, BaseButtonProps } from '../../components/base';

export type SettingsActionProps = {
  title: string;
  description: string;
  buttonProps: BaseButtonProps,
};

export function SettingsAction({
  title, description, buttonProps,
}: SettingsActionProps) {
  return (
    <div className="settings-action">
      <div className="settings-action-content">
        <div className="settings-action-title">{title}</div>
        <div className="settings-action-description">{description}</div>
      </div>
      <Base.Button {...buttonProps} />
    </div>
  );
}
