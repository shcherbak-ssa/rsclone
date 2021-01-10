import { UserType } from '../types/user.types';

export class UserData {
  private user: UserType;

  constructor(user: UserType) {
    this.user = user;
  }

  static create(user: UserType) {
    return new UserData(user);
  }

  getUserID() {
    return this.user.userID;
  }

  getUsername() {
    return this.user.username;
  }
}
