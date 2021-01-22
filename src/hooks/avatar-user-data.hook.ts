import { UserDataLabels } from '../constants';
import { useUserState } from './user-state.hook';

export function useAvatarUserData(): {
  userAvatar: string,
  userFullname: string,
} {
  const userAvatar = useUserState(UserDataLabels.AVATAR);
  const userFullname = useUserState(UserDataLabels.FULLNAME);

  return {
    userAvatar,
    userFullname,
  };
}
