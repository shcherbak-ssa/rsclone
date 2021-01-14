import { useEffect } from 'react';

import { Themes } from '../../common/constants';
import { DocumentBodyService } from '../services/document-body.service';

export function useChangeTheme(currentTheme: Themes) {
  useEffect(() => {
    const documentBodyService = new DocumentBodyService();
    documentBodyService.addClass(currentTheme);

    return () => {
      documentBodyService.removeClass(currentTheme);
    };
  }, [currentTheme]);
}
