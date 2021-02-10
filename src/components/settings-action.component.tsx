import React from 'react';
import classnames from 'classnames';
import './styles/settings-action.component.scss';

import { Base, BaseButtonProps } from './base';
import { Classnames } from '../constants/ui.constants';
import { SelectAction } from '../types/select-item.types';

export type SettingsActionComponentProps = {
  title: string,
  description: string,
  buttonProps: BaseButtonProps,
  selectAction?: SelectAction,
};

export function SettingsActionComponent({
  title, description, buttonProps, selectAction,
}: SettingsActionComponentProps) {
  const componentContent = (
    <>
      <div className="settings-action-content">
        <div className="settings-action-title">{title}</div>
        <div className="settings-action-description">{description}</div>
      </div>
      <Base.Button {...buttonProps} />
    </>
  );

  if (selectAction) {
    const {isSelected, toggleSelection} = selectAction;
    const componentCLassnames = classnames('settings-action', {
      [Classnames.SELECT_TYPE]: true,
      [Classnames.IS_SELECTED]: isSelected,
    });

    function handleClick() {
      toggleSelection();
    }

    return (
      <div className={componentCLassnames} data-class="click" onClick={handleClick}>
        {componentContent}
      </div>
    );
  } else {
    return <div className="settings-action">{componentContent}</div>;
  }
}
