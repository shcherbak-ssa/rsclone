import { SpaceColors } from '../../common/constants';
import { spaceColors } from '../../common/data';
import { UserDataLabels, ZERO } from '../constants';
import { UserDraftEvents, UserEvents } from '../constants/events.constants';
import { UpdatedDraftValue, userDraftController } from '../controllers/user-draft.controller';
import { ActiveSpace, userController } from '../controllers/user.controller';
import { resetActiveSpaceData, spacesDataLabels, spacesEmojis } from '../data/spaces.data';
import { Spaces } from '../types/services.types';
import { ToolsService } from './tools.service';

export class SpacesService implements Spaces {
  private toolsService: ToolsService;

  constructor() {
    this.toolsService = new ToolsService();
  }

  setInitialRandomSpaceLogo(): void {
    const randomEmoji: string = this.getRandomEmoji();
    this.updateSpaceLogo(randomEmoji);
  }

  resetSpaceStates() {
    const resetedSpace: ActiveSpace = {
      space: {
        ...resetActiveSpaceData,
        [UserDataLabels.SPACE_COLOR]: this.getRandomColor(),
        [UserDataLabels.SPACE_LOGO]: this.getRandomEmoji(),
      },
      callback: () => {},
    };

    userController.emit(UserEvents.SET_ACTIVE_SPACE, resetedSpace);
  }

  updateSpaceLogo(selectedSpaceLogo: string) {
    const updatedDraftData: UpdatedDraftValue = {
      value: selectedSpaceLogo,
      dataLabel: UserDataLabels.SPACE_LOGO,
    };

    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftData);
  }

  getRandomColor(): SpaceColors {
    const randomIndex: number = this.toolsService.getRandomNumber(ZERO, spaceColors.length - 1);
    return spaceColors[randomIndex];
  }

  getRandomEmoji(): string {
    const randomIndex: number = this.toolsService.getRandomNumber(ZERO, spacesEmojis.length - 1);
    return spacesEmojis[randomIndex];
  }
}
