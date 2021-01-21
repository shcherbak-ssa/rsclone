import { Space } from '../../common/entities';
import { UserDataLabels } from '../constants';
import { EMPTY_STRING } from '../constants/strings.constants';

export const spacesDataLabels: UserDataLabels[] = [
  UserDataLabels.SPACE_ID,
  UserDataLabels.SPACE_COLOR,
  UserDataLabels.SPACE_NAME,
  UserDataLabels.SPACE_LOGO,
];

export const resetActiveSpaceData: Space = {
  id: EMPTY_STRING,
  name: EMPTY_STRING,
  color: EMPTY_STRING,
  logo: EMPTY_STRING,
};
