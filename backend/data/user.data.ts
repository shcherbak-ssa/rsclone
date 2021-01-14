import { User } from '../types/user.types';

export class UserData {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  static create(user: User): UserData {
    return new UserData(user);
  }

  getUsername(): string {
    return this.user.username;
  }
}
