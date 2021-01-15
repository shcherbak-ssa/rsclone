import { GetUser, User } from '../../types/user.types';
import { usersCollectionDatabase } from '../../database/users-collection.database';

export interface GetUserDatabase {
  getUser(userID: string): Promise<User>;
}

export class GetUserModel {
  private database: GetUserDatabase;

  constructor() {
    this.database = usersCollectionDatabase;
  }

  async getUser(userID: string): Promise<GetUser> {
    const user: User = await this.database.getUser(userID);
    // @TODO: add request spaces
    return {user, spaces: []};
  }
}
