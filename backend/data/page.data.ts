import { NewPage } from '../types/pages.types';
import { LanguageLabels } from '../../common/constants';
import { EMPTY_STRING } from '../constants';

export const initialPage: {[key: string]: NewPage} = {
  [LanguageLabels.ENGLISH]: {
    title: 'Initial page',
    description: EMPTY_STRING,
    pathname: 'initial-page',
    nodes: EMPTY_STRING,
  },
  [LanguageLabels.RUSSIAN]: {
    title: 'Начальная страница',
    description: EMPTY_STRING,
    pathname: 'начальная-страница',
    nodes: EMPTY_STRING,
  },
  [LanguageLabels.ITALIAN]: {
    title: 'Pagina iniziale',
    description: EMPTY_STRING,
    pathname: 'pagina-iniziale',
    nodes: EMPTY_STRING,
  },
};
