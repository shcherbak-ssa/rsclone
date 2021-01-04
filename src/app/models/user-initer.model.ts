import { USER_LOCALSTORAGE_LABEL } from "../../constants";
import { LocalStorageService } from "../../services/localstorage.service";
import { NetworkService } from "../../services/network.service";

export class UserIniterModel {
  async loadUserData() {
    const localStorageService: LocalStorageService = new LocalStorageService();
    const urlParams = new URLSearchParams();

    const localStorageUser = localStorageService.get(USER_LOCALSTORAGE_LABEL);
    urlParams.append('id', localStorageUser.id);
    urlParams.append('email', localStorageUser.email);

    const loadUserUrl = `${location.pathname}?${urlParams.toString()}`;
    return await this.load(loadUserUrl);
  }

  private async load(loadUserUrl: string) {
    const networkService: NetworkService = new NetworkService();
    return await networkService.get(loadUserUrl);
  }
}
