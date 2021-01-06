import { ERROR_RESPONSE_TYPE } from "../../constants";
import { NetworkResponse, NetworkService } from "../../services/network.service";

export class DeleteAccountModel {
  async delete(callback: Function) {
    try {
      const response: NetworkResponse = await this.sendRequest();
      await this.parseResponse(response);
      
      callback(true);
    } catch (error) {
      console.log(error);
      callback(false);
    }
  }

  private async sendRequest() {
    const networkService = new NetworkService();
    return await networkService.delete();
  }

  private async parseResponse(response: NetworkResponse) {
    if (response.type === ERROR_RESPONSE_TYPE) {
      throw new Error('Delete account error');
    }
  }
}
