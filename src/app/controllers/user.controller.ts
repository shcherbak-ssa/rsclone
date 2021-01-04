import { Events } from "../../services/events.service";
import { UserEvents } from "../constants";
import { UserIniterModel } from "../models/user-initer.model";

export const userController: Events = new Events();

userController.on(UserEvents.LOAD_USER, loadUserHandler);

async function loadUserHandler(callback: Function) {
  const userIniterModel: UserIniterModel = new UserIniterModel();
  await userIniterModel.loadUserData();

  userController.off(UserEvents.LOAD_USER, loadUserHandler);
  callback();
}
