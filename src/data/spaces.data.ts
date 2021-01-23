import { Space } from '../../common/entities';
import { UserDataLabels } from '../constants';
import { EMPTY_STRING } from '../constants/strings.constants';

export const spacesEmojis: string[] = [];

export const spacesDataLabels: UserDataLabels[] = [
  UserDataLabels.SPACE_ID,
  UserDataLabels.SPACE_COLOR,
  UserDataLabels.SPACE_NAME,
  UserDataLabels.SPACE_LOGO,
  UserDataLabels.SPACE_PATHNAME,
];

export const resetActiveSpaceData: Space = {
  [UserDataLabels.SPACE_ID]: EMPTY_STRING,
  [UserDataLabels.SPACE_COLOR]: EMPTY_STRING,
  [UserDataLabels.SPACE_NAME]: EMPTY_STRING,
  [UserDataLabels.SPACE_LOGO]: EMPTY_STRING,
  [UserDataLabels.SPACE_PATHNAME]: EMPTY_STRING,
};
