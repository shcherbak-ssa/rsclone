import { USER_LOCALSTORAGE_LABEL } from "../constants";
import { LocalStorageService } from "./localstorage.service";

export class DeleteUserService {
  deleteFromLocal() {
    const localStorageService = new LocalStorageService();
    localStorageService.remove(USER_LOCALSTORAGE_LABEL);

    location.replace(location.origin);
  }
}
