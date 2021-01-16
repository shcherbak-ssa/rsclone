import React from 'react';
import './styles/settings-section.component.scss';

import { Base, BaseButtonProps } from './base';

export type SettingsSectionComponentProps = {
  title: string,
  saveButtonProps?: BaseButtonProps,
  children?: React.ReactNode,
};

export function SettingsSectionComponent({
  title, saveButtonProps, children,
}: SettingsSectionComponentProps) {
  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <div className="settings-section-title">{title}</div>
        {saveButtonProps ? <Base.Button {...saveButtonProps} /> : ''}
      </div>
      <div className="settings-section-content">{children}</div>
    </div>
  );
}
