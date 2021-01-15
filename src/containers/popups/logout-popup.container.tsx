import React from 'react';

import { PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParameters, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { usePopupLanguage } from '../../hooks/popup-language.hook';
import { PopupTextComponent } from '../../components/popup-text.component';

export function LogoutPopupContainer() {
  const popupLanguage = usePopupLanguage(PopupNames.LOGOUT);

  const popupPropsHookParameters: PopupPropsHookParameters = {
    popupName: PopupNames.LOGOUT,
    confirmButtonProps: {
      clickHandler: () => {
        console.log('log out');
      },
    },
  };

  const popupProps: PopupComponentProps | null = usePopupProps(popupPropsHookParameters);

  if (popupProps === null) return <div></div>;

  return (
    <PopupComponent {...popupProps}>
      <PopupTextComponent>{popupLanguage.content}</PopupTextComponent>
    </PopupComponent>
  );
}
