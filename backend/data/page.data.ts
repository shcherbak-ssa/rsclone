import { NewPage } from '../types/pages.types';
import { LanguageLabels } from '../../common/constants';
import { EMPTY_STRING, UserDataLabels } from '../constants';

export const initialPage: {[key: string]: NewPage} = {
  [LanguageLabels.ENGLISH]: {
    [UserDataLabels.PAGE_TITLE]: 'Initial page',
    [UserDataLabels.PAGE_DESCRIPTION]: EMPTY_STRING,
    [UserDataLabels.PAGE_PATHNAME]: 'initial-page',
    [UserDataLabels.PAGE_CONTENT]: EMPTY_STRING,
  },
  [LanguageLabels.RUSSIAN]: {
    [UserDataLabels.PAGE_TITLE]: 'Начальная страница',
    [UserDataLabels.PAGE_DESCRIPTION]: EMPTY_STRING,
    [UserDataLabels.PAGE_PATHNAME]: 'начальная-страница',
    [UserDataLabels.PAGE_CONTENT]: EMPTY_STRING,
  },
  [LanguageLabels.ITALIAN]: {
    [UserDataLabels.PAGE_TITLE]: 'Pagina iniziale',
    [UserDataLabels.PAGE_DESCRIPTION]: EMPTY_STRING,
    [UserDataLabels.PAGE_PATHNAME]: 'pagina-iniziale',
    [UserDataLabels.PAGE_CONTENT]: EMPTY_STRING,
  },
};
