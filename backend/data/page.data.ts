import { NewPage } from '../types/pages.types';
import { LanguageLabels } from '../../common/constants';

export const initialPage: {[key: string]: NewPage} = {
  [LanguageLabels.ENGLISH]: {
    title: 'Initial page',
    description: '',
    pathname: 'initial-page',
    nodes: [],
  },
  [LanguageLabels.RUSSIAN]: {
    title: 'Начальная страница',
    description: '',
    pathname: 'начальная-страница',
    nodes: [],
  },
  [LanguageLabels.ITALIAN]: {
    title: 'Pagina iniziale',
    description: '',
    pathname: 'pagina-iniziale',
    nodes: [],
  },
};
