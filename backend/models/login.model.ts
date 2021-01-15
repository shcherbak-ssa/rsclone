import { ClientError } from '../services/errors.service';
import { ErrorLabels, StatusCodes } from '../../common/constants';
import { LoginUser, AccessUser } from '../types/user.types';
import { AuthUserModel } from './auth-user.model';
import { usersCollectionDatabase } from '../database/users-collection.database';

export type FoundLoginUser = {
  _id: string,
  username: string,
  password: string,
};

export interface LoginUserDatabase {
  getUserForLogin(email: string): Promise<FoundLoginUser>;
}

export class LoginModel {
  private database: LoginUserDatabase;
  private authUserModel: AuthUserModel;

  constructor() {
    this.database = usersCollectionDatabase;
    this.authUserModel = new AuthUserModel();
  }

  async loginUser(user: LoginUser): Promise<AccessUser> {
    const foundUser: FoundLoginUser = await this.database.getUserForLogin(user.email);
    const isCorrectUser: boolean = this.isCorrectUser(user.password, foundUser.password);

    if (!isCorrectUser) {
      throw new ClientError(
        'Invalid password or e-mail',
        StatusCodes.NOT_FOUND,
        {
          isLoginError: true,
          error: ErrorLabels.INVALID_USER,
        },
      );
    }

    const token: string = await this.authUserModel.createAccessToken(foundUser._id);

    return {
      username: foundUser.username,
      token,
    };
  }

  private isCorrectUser(currentUserPassword: string, foundUserPassword: string): boolean {
    return currentUserPassword === foundUserPassword;
  }
}
