import { LanguageParts } from '../../common/constants';
import { PopupNames } from '../constants/ui.constants';
import { useLanguagePart } from './language-part.hook';

export function usePopupLanguage(popupName: PopupNames) {
  const appLanguage = useLanguagePart(LanguageParts.APP);
  return appLanguage.popups[popupName];
}
