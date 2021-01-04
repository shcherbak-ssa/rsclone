const JSON_CONTENT_TYPE: string = 'application/json';

export class NetworkService {
  get() {}

  private async sendRequest(method: string, contentType?: string) {
    return fetch(location.pathname, {
      method,
      headers: {
        'Content-Type': contentType || JSON_CONTENT_TYPE,
      }
    });
  }
}
