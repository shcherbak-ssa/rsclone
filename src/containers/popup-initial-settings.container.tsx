import React from 'react';

import { PopupComponent, PopupComponentProps } from '../components/popup.component';
import { PopupPropsHookParameters, usePopupProps } from '../hooks/popup-props.hook';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';

export function PopupInitialSettingsContainer() {
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const popupPropsHookParameters: PopupPropsHookParameters = {
    popupTitle: authLanguage.initialSettingsPopup.title,
    popupConfirmButtonProps: {
      value: authLanguage.initialSettingsPopup.confirmButtonValue,
      clickHandler: () => {},
    },
  };

  const popupProps: PopupComponentProps | null = usePopupProps(popupPropsHookParameters);

  return (
    <>
      {popupProps !== null ? <PopupComponent {...popupProps} /> : ''}
    </>
  );
}
