import { UserData } from '../data/user.data';
import { usersCollectionDatabase } from '../database/users-collection.database';

export type VerifyUserType = {
  username: string;
  userID: string;
};

export class AuthUserModel {
  private usernameCache: string = '';

  async isValidUser({userID, username}: VerifyUserType) {
    const foundUser: UserData | undefined = await usersCollectionDatabase.getUser(userID);
    
    if (foundUser && foundUser.getUsername() === username) {
      this.usernameCache = foundUser.getUsername();
      return true;
    }

    return false;
  }

  getAuthorizedUserUsername() {
    return this.usernameCache;
  }
}
