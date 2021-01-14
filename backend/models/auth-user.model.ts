import { GetUserDatabase, VerifyUser } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';

export class AuthUserModel {
  private database: GetUserDatabase = usersCollectionDatabase;

  async isValidUser({userID, username}: VerifyUser): Promise<boolean> {
    const userUsername: string = await this.database.getUsername(userID);
    return userUsername === username;
  }
}
