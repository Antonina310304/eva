import { useContext } from 'react';

import {
  ModalsState,
  ModalsMethods,
  ModalsStateContext,
  ModalsMethodsContext,
} from '@Contexts/Modals';

const useModals = (): [ModalsState, ModalsMethods] => {
  const state = useContext(ModalsStateContext);
  const methods = useContext(ModalsMethodsContext);

  return [state, methods];
};

export default useModals;
