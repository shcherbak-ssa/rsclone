import { useHistory } from 'react-router-dom';

import { LanguageParts } from '../../common/constants';
import { AuthModes, UserDataLabels, AppRoutePathnames } from '../constants';
import { useLanguagePart } from './language-part.hook';
import { useUserInputProps } from './user-input-props.hook';
import { AuthFormComponentProps } from '../components/auth-form.component';
import { userInputsController } from '../controllers/user-inputs.controller';
import { AuthEvents, UserInputsEvents } from '../constants/events.constants';
import { BaseInputProps } from '../components/base';
import { authController } from '../controllers/auth.controller';

export type AuthFormPropsParameters = {
  mode: AuthModes;
  nextRoutePathname: AppRoutePathnames;
};

export function useAuthFormProps({
  mode, nextRoutePathname
}: AuthFormPropsParameters): AuthFormComponentProps {
  const history = useHistory();
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const emailInputProps: BaseInputProps = useUserInputProps(UserDataLabels.EMAIL);
  const passwordInputProps: BaseInputProps = useUserInputProps(UserDataLabels.PASSWORD);

  const authFormProps: AuthFormComponentProps = {
    title: authLanguage[mode].title,
    linkText: authLanguage[mode].linkText,
    authError: '',
    inputsProps: [
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      value: authLanguage[mode].buttonValue,
      clickHandler: () => {
        if (mode === AuthModes.REGISTRATION) {
          authController.emit(AuthEvents.INIT_REGISTRATION);
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

      userInputsController.emit(UserInputsEvents.RESET_STATES, resetDataLabels);
      history.push(nextRoutePathname);
    },
  };

  return authFormProps;
}
