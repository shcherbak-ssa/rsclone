import React from 'react';

import { PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupTextComponent } from '../../components/popup-text.component';

export function DeleteAccountPopupContainer() {
  const popupPropsHookParams: PopupPropsHookParams = {
    popupName: PopupNames.DELETE_ACCOUNT,
    confirmButtonProps: {
      clickHandler: () => {},
    },
  };

  const [popupProps, popupLanguage]: [PopupComponentProps, any] | null
    = usePopupProps(popupPropsHookParams);

  if (popupProps === null) return <div></div>;

  return (
    <PopupComponent {...popupProps}>
      <PopupTextComponent>{popupLanguage.content}</PopupTextComponent>
    </PopupComponent>
  );
}
