import { PopupNames } from '../constants/ui.constants';

const subscribedPopups: Map<PopupNames, [Function, Function]> = new Map();

export class PopupService {
  subscribePopup(popupName: PopupNames, openPopup: Function, closePopup: Function) {
    subscribedPopups.set(popupName, [openPopup, closePopup]);
  }

  unsubscribePopup(popupName: PopupNames) {
    subscribedPopups.delete(popupName);
  }

  openPopup(popupName: PopupNames) {
    subscribedPopups.get(popupName)[0]();
  }

  closePopup(popupName: PopupNames) {
    subscribedPopups.get(popupName)[1]();
  }
}
