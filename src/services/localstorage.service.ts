export class LocalStorageService {
  exists(storageLabel: string) {
    return !!localStorage.getItem(storageLabel);
  }

  save(storageLabel: string, payload: any) {
    const storageItem = typeof payload === 'string' ? payload : JSON.stringify(payload);
    localStorage.setItem(storageLabel, storageItem);
  }

  remove(storageLabel: string) {
    localStorage.removeItem(storageLabel);
  }

  get(storageLabel: string) {
    const storage = localStorage.getItem(storageLabel);
    return JSON.parse(storage || '{}');
  }
}
