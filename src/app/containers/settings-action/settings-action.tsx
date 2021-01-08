import React from 'react';
import classnames from 'classnames';
import './settings-action.scss';

import { Base, BaseButtonProps } from '../../components/base';
import { IS_SELECTED_CLASSNAME } from '../../constants';

const SELECT_TYPE_CLASSNAME: string = 'select-type';

export type SettingsActionProps = {
  title: string,
  description: string,
  buttonProps: BaseButtonProps,
  isSelectType?: boolean,
  isSelected?: boolean,
  toggleSelection?: Function,
};

export function SettingsAction({
  title, description, buttonProps, isSelectType = false, isSelected = false, toggleSelection,
}: SettingsActionProps) {
  const componentContent = (
    <>
      <div className="settings-action-content">
        <div className="settings-action-title">{title}</div>
        <div className="settings-action-description">{description}</div>
      </div>
      <Base.Button {...buttonProps} />
    </>
  );

  if (isSelectType) {
    const componentCLassnames = classnames('settings-action', {
      [SELECT_TYPE_CLASSNAME]: isSelectType,
      [IS_SELECTED_CLASSNAME]: isSelected,
    });

    function clickHandle() {
      toggleSelection();
    }

    return (
      <div className={componentCLassnames} data-class="click" onClick={clickHandle}>
        {componentContent}
      </div>
    );
  } else {
    return <div className="settings-action">{componentContent}</div>;
  }
}
