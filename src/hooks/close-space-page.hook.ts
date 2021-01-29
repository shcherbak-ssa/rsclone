import { useHistory } from 'react-router-dom';

import { ActiveSpaceEvents } from '../constants/events.constants';
import { activeSpaceController } from '../controllers/active-space.controller';
import { AppRoutesService } from '../services/app-routes.service';
import { SpacesService } from '../services/spaces.service';
import { AppRoutes } from '../types/services.types';

export function useCloseSpacePage() {
  const history = useHistory();

  return () => {
    activeSpaceController.emit(ActiveSpaceEvents.CLOSE_SPACE);

    const appRoutes: AppRoutes = new AppRoutesService();
    const rootRoutePath: string = appRoutes.getRootRoutePath();
    history.push(rootRoutePath);

    const spacesService: SpacesService = new SpacesService();
    spacesService.resetSpaceStates();
  }
}
