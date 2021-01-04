import { USER_LOCALSTORAGE_LABEL, SUCCESS_RESPONSE_TYPE } from "../../constants";
import { LocalStorageService } from "../../services/localstorage.service";
import { NetworkService } from "../../services/network.service";
import { dispatchAction } from "../store";
import { UserStateType, userStore } from "../store/user.store";

export class UserIniterModel {
  async loadUserData() {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const urlParams = new URLSearchParams();

    const localStorageUser = localStorageService.get(USER_LOCALSTORAGE_LABEL);
    urlParams.append('id', localStorageUser.id);
    urlParams.append('email', localStorageUser.email);

    const loadUserUrl = `${location.pathname}?${urlParams.toString()}`;
    const response = await this.load(loadUserUrl);

    this.updateUserStoreStates(response.user, localStorageUser.email);
  }

  private updateUserStoreStates(user: UserStateType, email: string) {
    user.email = email;
    dispatchAction(userStore.actions.updateStates(user));
  }

  private async load(loadUserUrl: string) {
    const networkService: NetworkService = new NetworkService();
    const response = await networkService.get(loadUserUrl);

    if (response.type === SUCCESS_RESPONSE_TYPE) {
      return response.payload;
    }
  }
}
