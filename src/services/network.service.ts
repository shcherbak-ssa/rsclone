const JSON_CONTENT_TYPE: string = 'application/json';
const NETWORK_ERROR: string = 'NetworkError';

enum Methods {
  GET = 'GET',
};

export class NetworkError implements Error {
  name: string = NETWORK_ERROR;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class NetworkService {
  async get(url: string = location.pathname) {
    try {
      const response = await this.sendRequest(url, Methods.GET);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  private async sendRequest(url: string, method: string, contentType?: string) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': contentType || JSON_CONTENT_TYPE,
      }
    });
  }
}
