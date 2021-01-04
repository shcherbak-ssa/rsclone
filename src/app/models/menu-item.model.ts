import { MenuItemLabels } from "../constants";
import { dispatchAction, storeStates } from "../store";
import { appStore } from "../store/app.store";

export class MenuItemModel {
  changeMenuItem(nextMenuItem: MenuItemLabels) {
    if (nextMenuItem === storeStates.getActiveMenuItem()) return;

    dispatchAction(appStore.actions.changeMenuItem(nextMenuItem));
  }
}
