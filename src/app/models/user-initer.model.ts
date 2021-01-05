import { USER_LOCALSTORAGE_LABEL, SUCCESS_RESPONSE_TYPE } from "../../constants";
import { AppRoutesService } from "../../services/app-routes.service";
import { LocalStorageService } from "../../services/localstorage.service";
import { NetworkService } from "../../services/network.service";
import { dispatchAction } from "../store";
import { UserStateType, userStore } from "../store/user.store";

const USER_ID_URL_PARAM_LABEL: string = 'userID';
const USERNAME_URL_PARAM_LABEL: string = 'username';

export class UserIniterModel {
  async loadUserData() {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const urlParams = new URLSearchParams();

    const localStorageUser = localStorageService.get(USER_LOCALSTORAGE_LABEL);
    urlParams.append(USER_ID_URL_PARAM_LABEL, localStorageUser.userID);
    urlParams.append(USERNAME_URL_PARAM_LABEL, localStorageUser.username);

    const appRoutesService = new AppRoutesService();
    const pathname = appRoutesService.getRootRoutePath();

    const loadUserUrl = `${pathname}?${urlParams.toString()}`;
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
