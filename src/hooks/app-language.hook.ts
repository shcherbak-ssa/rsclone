import { LanguageParts } from '../../common/constants';
import { useLanguagePart } from './language-part.hook';

export function useAppLanguage() {
  return useLanguagePart(LanguageParts.APP);
}
