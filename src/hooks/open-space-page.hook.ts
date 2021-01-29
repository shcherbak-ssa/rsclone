import { useHistory } from 'react-router-dom';

import { Space } from '../../common/entities';
import { AppRoutesService } from '../services/app-routes.service';
import { AppRoutes } from '../types/services.types';

export function useOpenSpacePage(): (space: Space) => void {
  const history = useHistory();

  return (space: Space) => {
    const appRoutes: AppRoutes = new AppRoutesService();
    const spacePageRoutePath: string = appRoutes.getSpacePageRoutePath(space.pathname);
    history.push(spacePageRoutePath);
  };
}
