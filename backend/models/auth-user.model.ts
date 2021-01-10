import { UserData } from '../data/user.data';
import { usersCollectionDatabase } from '../database/users-collection.database';

export type VerifyUserType = {
  username: string;
  userID: string;
};

export class AuthUserModel {
  async getValidUser({userID, username}: VerifyUserType) {
    const foundUser: UserData | undefined = await usersCollectionDatabase.getUser(userID);
    return foundUser && foundUser.getUsername() === username ? foundUser : null;
  }
}
