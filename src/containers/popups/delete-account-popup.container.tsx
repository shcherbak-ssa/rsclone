import React from 'react';

import { ButtonTypes, PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupTextComponent } from '../../components/popup-text.component';

export function DeleteAccountPopupContainer() {
  const popupPropsHookParams: PopupPropsHookParams = {
    popupName: PopupNames.DELETE_ACCOUNT,
    confirmButtonProps: {
      type: ButtonTypes.DANGER,
      clickHandler: () => {},
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  if (popup === null) return <div></div>;

  return (
    <PopupComponent {...popup[0]}>
      <PopupTextComponent>{popup[1].content}</PopupTextComponent>
    </PopupComponent>
  );
}
