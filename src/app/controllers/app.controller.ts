import { Events } from "../../services/events.service";
import { AppEvents, MenuItemLabels } from "../constants";
import { MenuItemModel } from "../models/menu-item.model";

export const appController: Events = new Events();

appController.on(AppEvents.CHANGE_MENU_ITEM, changeMenuItemHandler);

function changeMenuItemHandler(nextMenuItem: MenuItemLabels) {
  const menuItemModel: MenuItemModel = new MenuItemModel();
  menuItemModel.changeMenuItem(nextMenuItem);
}
