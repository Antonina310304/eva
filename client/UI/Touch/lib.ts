export interface DivanTouchEvent extends MouseEvent, TouchEvent {}
export type DivanTouchEventHander = (e: DivanTouchEvent) => void;

const isClient: boolean = typeof window !== 'undefined';
const touchEnabled: boolean = isClient && 'ontouchstart' in window;

/*
 * Получает кординату по оси абсцисс из touch- или mouse-события
 */
const coordX = (e: DivanTouchEvent): number =>
  e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
/*
 * Получает кординату по оси ординат из touch- или mouse-события
 */
const coordY = (e: DivanTouchEvent): number =>
  e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || 0;

/*
 * Возвращает массив поддерживаемых событий
 * Если браузер поддерживает pointer events или подключена handjs, вернет события указателя.
 * Если нет, используем события мыши
 */
function supportedEvents(): string[] {
  if (touchEnabled) {
    return ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  }

  return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
}

export { supportedEvents, coordX, coordY, touchEnabled };
