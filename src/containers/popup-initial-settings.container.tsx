import React from 'react';
import { useSelector } from 'react-redux';
import saveIcon from '@iconify/icons-ic/baseline-save';

import { PopupComponent, PopupComponentProps } from '../components/popup.component';
import { PopupPropsHookParameters, usePopupProps } from '../hooks/popup-props.hook';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';
import { PopupNames } from '../constants/ui.constants';
import { SelectLanguageContainer, SelectLanguageContainerProps } from './select-language.container';
import { storeSelectorsService } from '../services/store-selectors.service';
import { Stores, UserDataLabels } from '../constants';
import { UpdatesControllerHookParameters, useUpdatesController } from '../hooks/updates-controller.hook';

export function PopupInitialSettingsContainer() {
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const authStoreSelectors = storeSelectorsService.get(Stores.AUTH_STORE);
  const currentLanguageState = useSelector(authStoreSelectors.getLanguageState());

  const updatesControllerHookParameters: UpdatesControllerHookParameters = {
    initialStates: {
      [UserDataLabels.LANGUAGE]: currentLanguageState,
    },
  };

  const isUpdatesExist = useUpdatesController(updatesControllerHookParameters);

  const popupPropsHookParameters: PopupPropsHookParameters = {
    popupName: PopupNames.INITIAL_SETTINGS,
    popupTitle: authLanguage.initialSettingsPopup.title,
    popupConfirmButtonProps: {
      isDisable: !isUpdatesExist,
      icon: saveIcon,
      value: authLanguage.initialSettingsPopup.confirmButtonValue,
      clickHandler: () => {
        console.log('save changes');
      },
    },
  };

  const popupProps: PopupComponentProps | null = usePopupProps(popupPropsHookParameters);

  if (popupProps === null) return <div></div>;

  const selectLanguageContainerProps: SelectLanguageContainerProps = {
    initialItemLabel: currentLanguageState,
  };

  return (
    <PopupComponent {...popupProps}>
      <SelectLanguageContainer {...selectLanguageContainerProps} />
    </PopupComponent>
  );
}
