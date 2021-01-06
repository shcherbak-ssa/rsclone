import { SUCCESS_RESPONSE_TYPE } from "../../constants";
import { NetworkResponse, NetworkService } from "../../services/network.service";
import { dispatchAction } from "../store";
import { UserStateType, userStore } from "../store/user.store";

export class UserIniterModel {
  async loadUserData() {
    const response: NetworkResponse = await this.load();
    const responsePayload = await this.parseResponse(response);

    this.updateUserStoreStates(responsePayload.user);
  }

  private async load() {
    const networkService: NetworkService = new NetworkService();
    return await networkService.get();
  }

  private async parseResponse(response: NetworkResponse) {
    if (response.type === SUCCESS_RESPONSE_TYPE) {
      return response.payload;
    }
  }

  private updateUserStoreStates(user: UserStateType) {
    dispatchAction(userStore.actions.updateStates(user));
  }
}
