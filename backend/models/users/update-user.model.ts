import { usersCollectionDatabase } from '../../database/users-collection.database';
import { UpdatedUserData } from '../../types/user.types';

export interface UpdateUserDatabase {
  updateUser(userID: string, updatedData: UpdatedUserData): Promise<void>;
}

export class UpdateUserModel {
  private database: UpdateUserDatabase;

  constructor() {
    this.database = usersCollectionDatabase;
  }

  async updateUser(userID: string, updatedData: UpdatedUserData): Promise<void> {
    await this.database.updateUser(userID, updatedData);
  }
}
