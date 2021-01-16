import { usersCollectionDatabase } from '../../database/users-collection.database';

export interface DeleteUserDatabase {
  deleteUser(userID: string): Promise<void>;
}

export class DeleteUserModel {
  private database: DeleteUserDatabase;
  
  constructor() {
    this.database = usersCollectionDatabase;
  }

  async deleteUser(userID: string): Promise<any> {
    await this.database.deleteUser(userID);
    return { deleted: true };
  }
}
