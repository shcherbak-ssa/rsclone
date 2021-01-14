import { ObjectID } from 'mongodb';
import { User } from 'types/user.types';

export interface CreateUserDatabase {
  createUser(newUser: User): ObjectID;
}

export class RegistrationModel {

}
