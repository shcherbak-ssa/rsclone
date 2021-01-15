import { ClientError } from '../services/errors.service';
import { ErrorLabels, StatusCodes, LanguageLabels, Themes } from '../../common/constants';
import { LoginUser, AccessUser } from '../types/user.types';
import { AuthUserModel } from './auth-user.model';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { UserDataLabels } from '../constants';

export type FoundLoginUser = {
  _id: string,
  username: string,
  password: string,
  language: LanguageLabels,
  theme: Themes,
};

export interface LoginUserDatabase {
  getUserForLogin(email: string): Promise<FoundLoginUser>;
  updateUser(username: string, updates: any): Promise<void>;
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

    const isNeedToUpdate: boolean = this.isNeedToUpdate(user, foundUser);

    if (isNeedToUpdate) {
      await this.database.updateUser(foundUser.username, {
        [UserDataLabels.LANGUAGE]: user.language,
        [UserDataLabels.THEME]: user.theme,
      });
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

  private isNeedToUpdate(currentUser: LoginUser, foundUser: FoundLoginUser): boolean {
    return currentUser.language !== foundUser.language || currentUser.theme !== foundUser.theme;
  }
}
