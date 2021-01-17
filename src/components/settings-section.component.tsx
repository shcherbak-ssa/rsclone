import React from 'react';
import classnames from 'classnames';
import './styles/settings-section.component.scss';

import { Base, BaseButtonProps } from './base';
import { Classnames } from '../constants/ui.constants';

export type SettingsSectionComponentProps = {
  title: string,
  isSavingActive?: boolean,
  saveButtonProps?: BaseButtonProps,
  children?: React.ReactNode,
};

export function SettingsSectionComponent({
  title, isSavingActive = false, saveButtonProps, children,
}: SettingsSectionComponentProps) {
  const componentClassnames = classnames('settings-section', {
    [Classnames.IS_DISABLE]: isSavingActive,
  });

  return (
    <div className={componentClassnames}>
      <div className="settings-section-header">
        <div className="settings-section-title">{title}</div>
        {saveButtonProps ? <Base.Button {...saveButtonProps} /> : ''}
      </div>
      <div className="settings-section-content">{children}</div>
    </div>
  );
}
