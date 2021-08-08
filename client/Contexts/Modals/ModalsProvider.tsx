import React, { useState, useCallback, useEffect, useRef, FC, createContext } from 'react';

import ErrorBoundary from '@Components/ErrorBoundary';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import AsyncModal from './AsyncModal';
import { ModalsState, ModalsMethods, ModalId } from './typings';

const ModalsStateContext = createContext<ModalsState>({ stack: [] });
const ModalsMethodsContext = createContext<ModalsMethods>(null);

const ModalsProvider: FC = (props) => {
  const { children } = props;
  const [stack, setStack] = useState([]);
  const [key, setKey] = useState(1);
  const refTop = useRef(0);

  const currentModal = stack.find((modal) => modal.opened);

  const getModalById = useCallback(
    (id: ModalId) => {
      return stack.find((modal) => modal.id === id);
    },
    [stack],
  );

  const openModal = useCallback((id: ModalId, data) => {
    refTop.current = refTop.current || window.scrollY;

    setStack((prevStack) => {
      const newStack = prevStack.map((modal) => ({ ...modal, visible: false, opened: false }));

      newStack.push({ id, data, visible: false, opened: true });

      return newStack;
    });
  }, []);

  const closeModal = useCallback((id: ModalId) => {
    setStack((prevStack) => {
      return prevStack.map((modal) => ({
        ...modal,
        visible: modal.id === id ? false : modal.id,
      }));
    });

    setTimeout(() => {
      setStack((prevStack) => {
        return prevStack.filter((modal) => modal.id !== id);
      });
    }, 400);
  }, []);

  const closeAllModals = useCallback(async () => {
    setStack([]);
  }, []);

  const getData = useCallback(
    (id: ModalId) => {
      const modal = getModalById(id);

      return modal && modal.data;
    },
    [getModalById],
  );

  const isVisible = useCallback(
    (id: ModalId) => {
      const modal = getModalById(id);

      return modal && modal.visible;
    },
    [getModalById],
  );

  const handleError = useCallback(() => {
    setStack([]);
    setKey((prev) => prev + 1);

    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handleClose = useCallback(() => {
    if (!currentModal) return;

    closeModal(currentModal.id);
  }, [closeModal, currentModal]);

  const handleLoad = useCallback(() => {
    setTimeout(() => {
      setStack((prevStack) => {
        return prevStack.map((modal) => ({
          ...modal,
          visible: modal.id === currentModal.id,
        }));
      });
    }, 400);
  }, [currentModal]);

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

  useKeyboardEvents({
    onEscape: handleClose,
  });

  return (
    <ModalsStateContext.Provider value={{ stack }}>
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
          {currentModal ? (
            <AsyncModal modal={currentModal} onClose={handleClose} onLoad={handleLoad} />
          ) : null}
        </ErrorBoundary>
      </ModalsMethodsContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export { ModalsStateContext, ModalsMethodsContext };
export default ModalsProvider;
