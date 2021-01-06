import { Events } from "../../services/events.service";
import { UserEvents } from "../constants";
import { DeleteAccountModel } from "../models/delete-account.model";
import { UserIniterModel } from "../models/user-initer.model";

export const userController: Events = new Events();

userController
  .on(UserEvents.LOAD_USER, loadUserHandler)
  .on(UserEvents.DELETE_ACCOUNT, deleteAccountHandler);

async function loadUserHandler(callback: Function) {
  const userIniterModel: UserIniterModel = new UserIniterModel();
  await userIniterModel.loadUserData();

  userController.off(UserEvents.LOAD_USER, loadUserHandler);
  callback();
}

async function deleteAccountHandler(callback: Function) {
  const deleteAccountModel = new DeleteAccountModel();
  await deleteAccountModel.delete(callback);
}
