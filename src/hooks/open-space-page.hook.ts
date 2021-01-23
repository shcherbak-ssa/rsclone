import { useHistory } from 'react-router-dom';

import { Space } from '../../common/entities';
import { AppRoutesService } from '../services/app-routes.service';
import { AppRoutes } from '../types/services.types';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';

export function useOpenSpacePage(): Function {
  const history = useHistory();

  function changeAppRoute(space: Space) {
    const appRoutes: AppRoutes = new AppRoutesService();
    const spacePageRoutePath: string = appRoutes.getSpacePageRoutePath(space.pathname);
    history.push(spacePageRoutePath);
  }

  return (space: Space) => {
    activeSpaceController.emit(ActiveSpaceEvents.SET_IS_OPEN, true);
    changeAppRoute(space);
  };
}
