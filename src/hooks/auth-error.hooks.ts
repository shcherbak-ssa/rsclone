import { useSelector } from "react-redux";

import { Stores } from "../constants";
import { storeService } from "../services/store.service";

export function useAuthError() {
  const authStoreSelectors = storeService.getStoreSelectors(Stores.AUTH_STORE);
  const authError = useSelector(authStoreSelectors.getAuthError);

  return authError;
}
