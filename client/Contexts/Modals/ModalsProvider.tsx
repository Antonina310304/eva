import React, { useState, useCallback, useEffect, FC, createContext, useMemo, useRef } from 'react';

import ErrorBoundary from '@Components/ErrorBoundary';
import FadeTransition from '@UI/FadeTransition';
import initialState from './initialState';
import AsyncModal from './AsyncModal';
import { ModalsState, ModalsMethods, ModalsMap, ModalId } from './typings';
import styles from './ModalsProvider.module.css';

const ModalsStateContext = createContext<ModalsState>(initialState);
const ModalsMethodsContext = createContext<ModalsMethods>(null);

const ModalsProvider: FC = (props) => {
  const { children } = props;
  const [modals, setModals] = useState<ModalsMap>();
  const [stack, setStack] = useState([]);
  const [key, setKey] = useState(1);
  const refTop = useRef(0);

  const currentModal = useMemo(() => {
    return Object.values(modals || {}).find((modal) => modal.visible);
  }, [modals]);

  const openModal = useCallback((id: ModalId, data) => {
    refTop.current = refTop.current || window.scrollY;

    setStack((prev) => {
      const newStack = [].concat(prev, [id]);

      setModals((prevModals: any) => {
        if (!prevModals) {
          return {
            [id]: {
              id,
              data,
              visible: true,
            },
          };
        }

        Object.values(prevModals).map((modal: any) => {
          return { ...modal, visible: modal.id === newStack[newStack.length - 1] };
        });

        return {
          ...prevModals,
          [id]: {
            id,
            data,
            visible: true,
          },
        };
      });

      return newStack;
    });
  }, []);

  const closeModal = useCallback((id: ModalId) => {
    setStack((prev) => {
      const newStack = prev.filter((modal) => modal !== id);

      setModals((prevModals) => {
        if (!prevModals || !prevModals[id]) return prevModals;

        Object.values(prevModals).map((modal) => {
          return Object.assign(modal, { visible: modal.id === newStack[newStack.length - 1] });
        });

        return {
          ...prevModals,
          [id]: Object.assign(prevModals[id], { visible: false }),
        };
      });

      return newStack;
    });
  }, []);

  const closeAllModals = useCallback(async () => {
    setModals(null);
    setStack([]);
  }, []);

  const getData = useCallback(
    (id: ModalId) => {
      if (!modals) return false;

      return modals[id] && modals[id].data;
    },
    [modals],
  );

  const isVisible = useCallback(
    (id: ModalId) => {
      return modals && modals[id] ? modals[id].visible : false;
    },
    [modals],
  );

  const handleError = useCallback(() => {
    setModals(null);
    setStack([]);
    setKey((prev) => prev + 1);

    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handleClose = useCallback(() => {
    closeModal(currentModal.id);
  }, [closeModal, currentModal]);

  // Блокируем скролл на странице
  useEffect(() => {
    function cleanup() {
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      document.documentElement.style.width = '';
      window.scrollTo(0, refTop.current);
    }

    if (stack.length > 0) {
      document.documentElement.style.top = `-${refTop.current}px`;
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
    }

    if (stack.length === 0) {
      refTop.current = 0;
    }

    return cleanup;
  }, [stack.length]);

  return (
    <ModalsStateContext.Provider
      value={{
        modals,
        currentModal,
      }}
    >
      <ModalsMethodsContext.Provider
        value={{
          openModal,
          closeModal,
          closeAllModals,
          getData,
          isVisible,
        }}
      >
        {children}

        <ErrorBoundary key={key} onError={handleError}>
          <FadeTransition in={!!currentModal} unmountOnExit>
            <div className={styles.wrapper}>
              <div className={styles.backdrop} />
              {currentModal && (
                <AsyncModal className={styles.modal} modal={currentModal} onClose={handleClose} />
              )}
            </div>
          </FadeTransition>
        </ErrorBoundary>
      </ModalsMethodsContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export { ModalsStateContext, ModalsMethodsContext };
export default ModalsProvider;
