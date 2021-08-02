import { useCallback, useEffect } from 'react';

export type Handler = (e: KeyboardEvent) => void;
export type EventsList =
  | 'onArrowLeft'
  | 'onArrowRight'
  | 'onArrowUp'
  | 'onArrowDown'
  | 'onEscape'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onSpace';
export type EventsMap = Partial<Record<EventsList, Handler>>;

/**
 * Эффект для подписки на события клавиатуры
 * @param eventsMap  перечисление обработчиков событий
 * @example
 * useKeyboardEvents({
 *  onEscape: () => console.log('Escape was pressed!')
 * })
 */
const useKeyboardEvents = (eventsMap: EventsMap): void => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (eventsMap.onKeyDown) eventsMap.onKeyDown(e);

      if (['Escape'].includes(e.key) && eventsMap.onEscape) {
        eventsMap.onEscape(e);
      }

      if (['a', 'ArrowLeft'].includes(e.key) && eventsMap.onArrowLeft) {
        eventsMap.onArrowLeft(e);
      }

      if (['d', 'ArrowRight'].includes(e.key) && eventsMap.onArrowRight) {
        eventsMap.onArrowRight(e);
      }

      if (['w', 'ArrowUp'].includes(e.key) && eventsMap.onArrowUp) {
        eventsMap.onArrowUp(e);
      }

      if (['s', 'ArrowDown'].includes(e.key) && eventsMap.onArrowDown) {
        eventsMap.onArrowDown(e);
      }

      if (e.code === 'Space' && eventsMap.onSpace) {
        eventsMap.onSpace(e);
      }
    },
    [eventsMap],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (eventsMap.onKeyUp) eventsMap.onKeyUp(e);
    },
    [eventsMap],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};

export default useKeyboardEvents;
