import { LanguageParts } from '../../common/constants';
import { UserDataLabels } from '../constants';
import { useLanguagePart } from './language-part.hook';

export function useUserInputLanguage(dataLabel: UserDataLabels) {
  const userDraftLanguage = useLanguagePart(LanguageParts.USER_DRAFT);
  return userDraftLanguage[dataLabel];
}
