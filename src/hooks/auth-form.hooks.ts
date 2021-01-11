import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AppRoutePathnames, Stores } from "../constants";
import { storeService } from "../services/store.service";

export function useAuthForm(nextHistoryPathname: AppRoutePathnames) {
  const history = useHistory();

  const authStoreSelectors = storeService.getStoreSelectors(Stores.AUTH_STORE);
  const authError = useSelector(authStoreSelectors.getAuthError);

  function authFormLinkClickHanlder() {
    history.push(nextHistoryPathname);
  }

  return [authError, authFormLinkClickHanlder];
}
