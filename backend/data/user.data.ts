import { UserType } from '../types/user.types';

export class UserData {
  private user: UserType;

  constructor(user: UserType) {
    this.user = user;
  }

  static create(user: UserType): UserData {
    return new UserData(user);
  }

  getUserID(): string {
    return this.user.userID;
  }

  getUsername(): string {
    return this.user.username;
  }
}
