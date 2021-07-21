import React, { useState, useCallback, useEffect, FC, createContext, useMemo } from 'react';

import ErrorBoundary from '@Components/ErrorBoundary';
import initialState from './initialState';
import AsyncModal from './AsyncModal';
import { ModalsState, ModalsMethods, ModalsMap, ModalId } from './typings';

const ModalsStateContext = createContext<ModalsState>(initialState);
const ModalsMethodsContext = createContext<ModalsMethods>(null);

const timing = 300;
const ModalsProvider: FC = (props) => {
  const { children } = props;
  const [modals, setModals] = useState<ModalsMap>();
  const [stack, setStack] = useState([]);
  const [animatings, setAnimatings] = useState([]);
  const [key, setKey] = useState(1);

  const currentModal = useMemo(() => {
    return Object.values(modals || {}).find((modal) => modal.visible);
  }, [modals]);

  const openModal = useCallback((id: ModalId, data) => {
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

  const closeModal = useCallback((id) => {
    setAnimatings((prev) => prev.concat([id]));

    setTimeout(() => {
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

      setAnimatings((prev) => prev.filter((_id) => id !== _id));
    }, timing);
  }, []);

  const closeAllModals = useCallback(async () => {
    setAnimatings([stack[stack.length - 1]]);

    setTimeout(() => {
      setModals(null);
      setStack([]);
      setAnimatings([]);

      return Promise.resolve();
    }, timing);
  }, [stack]);

  const getData = useCallback(
    (id) => {
      if (!modals) return false;

      return modals[id] && modals[id].data;
    },
    [modals],
  );

  const isVisible = useCallback(
    (id) => {
      return modals && modals[id] ? modals[id].visible : false;
    },
    [modals],
  );

  const isAnimating = useCallback((id) => animatings.includes(id), [animatings]);

  const handleError = useCallback(() => {
    setModals(null);
    setStack([]);
    setAnimatings([]);
    setKey((prev) => prev + 1);

    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  // Блокируем скролл на странице
  useEffect(() => {
    function cleanup() {
      document.documentElement.style.overflow = 'initial';
    }

    if (stack.length > 0) {
      document.documentElement.style.overflow = 'hidden';
    }

    return cleanup;
  }, [stack.length]);

  return (
    <ModalsStateContext.Provider
      value={{
        modals,
        animatings,
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
          isAnimating,
        }}
      >
        {children}
        <ErrorBoundary key={key} onError={handleError}>
          {currentModal ? <AsyncModal modal={currentModal} /> : null}
        </ErrorBoundary>
      </ModalsMethodsContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export { ModalsStateContext, ModalsMethodsContext };
export default ModalsProvider;
