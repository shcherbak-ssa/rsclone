import { useEffect, useState } from 'react';

import { StoreStateGetter } from './store-types';
import { store } from './store.service';

export function useStoreState({storeName, filter}: StoreStateGetter) {
  const states = store.getStates({storeName});
  const [currentStates, setCurrentStates] = useState(states);

  useEffect(() => {
    setCurrentStates(states);
  }, [states]);

  return filter ? filter(currentStates) : currentStates;
}
