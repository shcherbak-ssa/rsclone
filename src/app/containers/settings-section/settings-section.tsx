import React from 'react';
import classnames from 'classnames';
import './settings-section.scss';

import saveIcon from '@iconify/icons-ic/baseline-save';

import { Base, BaseButtonProps } from '../../components/base';
import { IS_ACTIVE_CLASSNAME } from '../../constants';

export type SettingsSectionProps = {
  isActive: boolean,
  title: string,
  unsavedDataExist: boolean,
  saveButtonClickHanlder: () => void,
};

export function SettingsSection({
  isActive, title, unsavedDataExist, saveButtonClickHanlder,
}: SettingsSectionProps) {
  const componentClassnames = classnames('settings-section', {
    [IS_ACTIVE_CLASSNAME]: isActive,
  });

  const saveButtonProps: BaseButtonProps = {
    icon: saveIcon,
    value: 'Save changes',
    clickHandler: saveButtonClickHanlder,
  };

  return (
    <div className={componentClassnames}>
      <div className="settings-section-header">
        <div className="settings-section-title">{title}</div>
        {unsavedDataExist ? <Base.Button {...saveButtonProps} /> : ''}
      </div>
      <div className="settings-section-content"></div>
    </div>
  );
}
