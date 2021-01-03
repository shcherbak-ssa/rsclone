export class LocalStorageService {
  exists(storageLabel: string) {
    return !!localStorage.getItem(storageLabel);
  }

  save(storageLabel: string, payload: any) {
    localStorage.setItem(storageLabel, JSON.stringify(payload));
  }

  get(storageLabel: string) {
    const storage = localStorage.getItem(storageLabel);
    return JSON.parse(storage || '{}');
  }
}
