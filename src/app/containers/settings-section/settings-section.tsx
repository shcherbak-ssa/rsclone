import React from 'react';
import './settings-section.scss';

import saveIcon from '@iconify/icons-ic/baseline-save';

import { Base, BaseButtonProps } from '../../components/base';

export type SettingsSectionProps = {
  title: string,
  unsavedDataExist?: boolean,
  saveButtonClickHanlder?: () => void,
  children?: React.ReactNode,
};

export function SettingsSection({
  title, unsavedDataExist = false, saveButtonClickHanlder, children
}: SettingsSectionProps) {
  const saveButtonProps: BaseButtonProps = {
    icon: saveIcon,
    value: 'Save changes',
    clickHandler: saveButtonClickHanlder,
  };

  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <div className="settings-section-title">{title}</div>
        {unsavedDataExist ? <Base.Button {...saveButtonProps} /> : ''}
      </div>
      <div className="settings-section-content">{children}</div>
    </div>
  );
}
