import { RequestPathnames } from '../../common/constants';
import { RequestCreator } from '../data/request.data';
import { ResponseData } from '../data/response.data';
import { RequestService } from '../services/request.service';

export class AppModel {
  async initApp() {
    try {
      const requestData = this.createRequest();
      const responseData = await RequestService.get(requestData).sendRequest();

      this.parseResponse(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  private createRequest() {
    const requestCreator = new RequestCreator();
    requestCreator.setFullUrl(RequestPathnames.USERS);

    return requestCreator.createRequest();
  }

  private parseResponse(responseData: ResponseData) {
    if (responseData.isSuccessStatusCode()) {
      console.log('success');
    } else {
      console.log('error', responseData.getStatusCode());
    }
  }
}
