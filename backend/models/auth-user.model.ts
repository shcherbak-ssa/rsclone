import { GetUserDatabase, VerifyUser } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { AuthAccessToken } from '../types/access-token.types';
import { AccessTokenService } from '../services/access-token.service';

export class AuthUserModel {
  private database: GetUserDatabase = usersCollectionDatabase;

  async isValidUser({userID, username}: VerifyUser): Promise<boolean> {
    const userUsername: string = await this.database.getUsername(userID);
    return userUsername === username;
  }

  async createAccessToken(userID: string): Promise<string> {
    const accessToken: AuthAccessToken = new AccessTokenService();
    return await accessToken.createToken({userID});
  }
}
