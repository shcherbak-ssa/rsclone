import { SUCCESS_RESPONSE_TYPE } from "../../constants";
import { NetworkService } from "../../services/network.service";
import { dispatchAction } from "../store";
import { UserStateType, userStore } from "../store/user.store";

export class UserIniterModel {
  async loadUserData() {
    const response = await this.load();
    this.updateUserStoreStates(response.user);
  }

  private async load() {
    const networkService: NetworkService = new NetworkService();
    const response = await networkService.get();

    if (response.type === SUCCESS_RESPONSE_TYPE) {
      return response.payload;
    }
  }

  private updateUserStoreStates(user: UserStateType) {
    dispatchAction(userStore.actions.updateStates(user));
  }
}
