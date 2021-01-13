import { PopupNames } from '../constants/ui.constants';

const subscribedPopups: Map<PopupNames, Function> = new Map;

export class PopupService {
  subscribePopup(popupName: PopupNames, openPopupFunction: Function) {
    subscribedPopups.set(popupName, openPopupFunction);
  }

  unsubscribePopup(popupName: PopupNames) {
    subscribedPopups.delete(popupName);
  }

  openPopup(popupName: PopupNames) {
    subscribedPopups.get(popupName)();
  }
}
