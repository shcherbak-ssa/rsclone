import React from 'react';
import './popup.scss';

import { ButtonTypes } from '../../constants';
import { Base, BaseButtonProps } from '../../components/base';

export type PopupProps = {
  title: string,
  confirmButtonProps: BaseButtonProps,
};

export function Popup({
  title, confirmButtonProps,
}: PopupProps) {

  const cancelButtonProps: BaseButtonProps = {
    type: ButtonTypes.SECONDARY,
    value: 'Cancel',
    clickHandler: () => {},
  };

  return (
    <div className="popup">
      <div className="popup-header" data-class="flex-column">{title}</div>
      <div className="popup-body"></div>
      <div className="popup-footer">
        <Base.Button {...cancelButtonProps} />
        <Base.Button {...confirmButtonProps} />
      </div>
    </div>
  );
}
