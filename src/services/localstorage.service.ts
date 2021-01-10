export class LocalStorageService {
  save(storageLabel: string, payload: object) {
    const storageItem = JSON.stringify(payload);
    localStorage.setItem(storageLabel, storageItem);
  }

  remove(storageLabel: string) {
    localStorage.removeItem(storageLabel);
  }

  get(storageLabel: string) {
    const storage = localStorage.getItem(storageLabel);
    return storage ? JSON.parse(storage) : null;
  }
}
