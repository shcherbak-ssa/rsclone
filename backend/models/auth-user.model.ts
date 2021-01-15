import { VerifyUser } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { AuthAccessToken } from '../types/access-token.types';
import { AccessTokenService } from '../services/access-token.service';

export interface GetUsernameDatabase {
  getUsername(userID: string): Promise<any>;
}

export class AuthUserModel {
  private database: GetUsernameDatabase = usersCollectionDatabase;

  async isValidUser({userID, username}: VerifyUser): Promise<boolean> {
    const foundUser: any = await this.database.getUsername(userID);
    return foundUser.username === username;
  }

  async createAccessToken(userID: string): Promise<string> {
    const accessToken: AuthAccessToken = new AccessTokenService();
    return await accessToken.createToken({userID});
  }
}
