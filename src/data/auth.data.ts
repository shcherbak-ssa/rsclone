import { UserDataLabels } from '../constants';

export const loginDataLabels: UserDataLabels[] = [
  UserDataLabels.EMAIL,
  UserDataLabels.PASSWORD,
];

export const registrationDataLabels: UserDataLabels[] = [
  UserDataLabels.FULLNAME,
  ...loginDataLabels,
];
