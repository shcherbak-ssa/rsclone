import { useEffect } from 'react';

import { UserDataLabels } from '../constants';
import { DocumentBodyService } from '../services/document-body.service';
import { ThemeService } from '../services/theme.service';
import { useUserState } from './user-state.hook';

export function useChangeTheme() {
  const currentTheme = useUserState(UserDataLabels.THEME);

  useEffect(() => {
    const documentBodyService = new DocumentBodyService();
    documentBodyService.addClass(currentTheme);

    ThemeService.loadTheme(currentTheme);

    return () => {
      documentBodyService.removeClass(currentTheme);
    };
  }, [currentTheme]);
}
