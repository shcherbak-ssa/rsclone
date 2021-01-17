import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LanguageParts } from '../../common/constants';
import { AuthModes, UserDataLabels, AppRoutePathnames, Stores } from '../constants';
import { useLanguagePart } from './language-part.hook';
import { UserInputPropsHookParams, useUserInputProps } from './user-input-props.hook';
import { AuthFormComponentProps } from '../components/auth-form.component';
import { userDraftController } from '../controllers/user-draft.controller';
import { AuthEvents, UserDraftEvents } from '../constants/events.constants';
import { BaseInputProps } from '../components/base';
import { authController } from '../controllers/auth.controller';
import { storeSelectorsService } from '../services/store-selectors.service';
import { usePasswordInputProps } from './password-input-props.hook';

export type AuthFormPropsParameters = {
  mode: AuthModes;
  nextRoutePathname: AppRoutePathnames;
};

export function useAuthFormProps({
  mode, nextRoutePathname
}: AuthFormPropsParameters): AuthFormComponentProps {
  const history = useHistory();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const authLanguage = useLanguagePart(LanguageParts.AUTH);
  
  const authStoreSelectors = storeSelectorsService.get(Stores.AUTH_STORE);
  const authError = useSelector(authStoreSelectors.getAuthError());

  const emailInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel: UserDataLabels.EMAIL,
  };

  const emailInputProps: BaseInputProps = useUserInputProps(emailInputPropsHookParams);
  const passwordInputProps: BaseInputProps = usePasswordInputProps();

  const authFormProps: AuthFormComponentProps = {
    title: authLanguage[mode].title,
    linkText: authLanguage[mode].linkText,
    authError: authLanguage.errors[authError],
    inputsProps: [
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      isLoading: isButtonLoading,
      value: authLanguage[mode].buttonValue,
      clickHandler: () => {
        setIsButtonLoading(true);

        if (mode === AuthModes.REGISTRATION) {
          authController.emit(AuthEvents.INIT_REGISTRATION, removeLoading);
        } else {
          authController.emit(AuthEvents.INIT_LOGIN, removeLoading);
        }
      },
    },
    linkClickHanlder: () => {
      const resetDataLabels: UserDataLabels[] = [
        UserDataLabels.EMAIL,
        UserDataLabels.PASSWORD,
      ];

      if (mode === AuthModes.REGISTRATION) {
        resetDataLabels.push(UserDataLabels.FULLNAME);
      }

      userDraftController.emit(UserDraftEvents.RESET_STATES, resetDataLabels);
      authController.emit(AuthEvents.REMOVE_ERROR);
      history.push(nextRoutePathname);
    },
  };

  function removeLoading() {
    setIsButtonLoading(false);
  }

  return authFormProps;
}
