import { useHistory } from 'react-router-dom';

import { LanguageParts } from '../../common/constants';
import { AuthModes, UserDataLabels, AppRoutePathnames } from '../constants';
import { useLanguagePart } from './language-part.hook';
import { useUserInputProps } from './user-input-props.hook';
import { AuthFormComponentProps } from '../components/auth-form.component';
import { userInputsController } from '../controllers/user-inputs.controller';
import { UserInputsEvents } from '../constants/events.constants';
import { BaseInputProps } from '../components/base';

export type AuthFormPropsParameters = {
  mode: AuthModes;
  nextRoutePathname: AppRoutePathnames;
};

export function useAuthFormProps(
  {mode, nextRoutePathname}: AuthFormPropsParameters
): AuthFormComponentProps {
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
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      userInputsController.emit(UserInputsEvents.RESET_STATES);
      history.push(nextRoutePathname);
    },
  };

  return authFormProps;
}
