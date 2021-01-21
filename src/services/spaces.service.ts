import { SpaceColors } from '../../common/constants';
import { spaceColors } from '../../common/data';
import { UserDataLabels, ZERO } from '../constants';
import { UserEvents } from '../constants/events.constants';
import { ActiveSpace, userController } from '../controllers/user.controller';
import { resetActiveSpaceData } from '../data/spaces.data';
import { Spaces } from '../types/services.types';
import { ToolsService } from './tools.service';

export class SpacesService implements Spaces {
  resetSpaceStates() {
    const activeSpace: ActiveSpace = {
      space: {
        ...resetActiveSpaceData,
        [UserDataLabels.SPACE_COLOR]: this.getRandomColor(),
      },
      callback: () => {},
    };

    userController.emit(UserEvents.SET_ACTIVE_SPACE, activeSpace);
  }

  getRandomColor(): SpaceColors {
    const toolsService: ToolsService = new ToolsService();
    const randomIndex: number = toolsService.getRandomNumber(ZERO, spaceColors.length);
    return spaceColors[randomIndex];
  }
}
