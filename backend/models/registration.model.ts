import { AccessUser, User, RegistrationUser } from '../types/user.types';
import { usersCollectionDatabase } from '../database/users-collection.database';
import { AuthUserModel } from './auth-user.model';
import { defaultUserData } from '../data/default.data';
import { Username } from '../types/services.types';
import { UsernameService } from '../services/username.service';

export interface CreateUserDatabase {
  createUser(newUser: User): Promise<string>;
}

export class RegistrationModel {
  private database: CreateUserDatabase;
  private authUserModel: AuthUserModel;
  private usernameService: Username;

  constructor() {
    this.database = usersCollectionDatabase;
    this.authUserModel = new AuthUserModel();
    this.usernameService = new UsernameService();
  }

  async createUser(user: RegistrationUser): Promise<AccessUser> {
    const newUser: User = await this.createNewUser(user);
    const userID: string = await this.database.createUser(newUser);
    const token: string = await this.authUserModel.createAccessToken(userID);
    
    return {
      username: newUser.username,
      token,
    };
  }

  private async createNewUser(user: RegistrationUser): Promise<User> {
    const username: string = await this.usernameService.createUsername(user.email);

    return {
      username,
      ...user,
      ...defaultUserData,
    };
  }
}
