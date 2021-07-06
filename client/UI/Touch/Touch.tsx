/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  DragEvent,
  MouseEvent,
  FC,
  useCallback,
  useEffect,
  ReactChild,
  HTMLAttributes,
  useRef,
  useImperativeHandle,
  forwardRef,
  Ref,
} from 'react';

import { coordX, coordY, DivanTouchEvent, DivanTouchEventHander } from './lib';

export type TouchEventHandler = (e: TouchEvent) => void;
export type ClickHandler = (e: MouseEvent<HTMLElement>) => void;
export type DragHandler = (e: DragEvent<HTMLElement>) => void;

export interface Gesture {
  startX?: number;
  startY?: number;
  startT?: Date;
  isPressed?: boolean;
  isY?: boolean;
  isX?: boolean;
  isSlideX?: boolean;
  isSlideY?: boolean;
  isSlide?: boolean;
  shiftX?: number;
  shiftY?: number;
  shiftPointerX?: number;
  shiftPointerY?: number;
  shiftXAbs?: number;
  shiftYAbs?: number;
}

export interface TouchEvent extends Gesture {
  originalEvent: DivanTouchEvent;
}

export interface TouchProps extends HTMLAttributes<HTMLElement> {
  onStart?(outputEvent: TouchEvent): void;
  onStartX?(outputEvent: TouchEvent): void;
  onStartY?(outputEvent: TouchEvent): void;
  onMove?(outputEvent: TouchEvent): void;
  onMoveX?(outputEvent: TouchEvent): void;
  onMoveY?(outputEvent: TouchEvent): void;
  onEnd?(outputEvent: TouchEvent): void;
  onEndX?(outputEvent: TouchEvent): void;
  onEndY?(outputEvent: TouchEvent): void;
  useCapture?: boolean;
  children?: ReactChild;
  ref?: Ref<HTMLElement>;
}

const versions = [
  ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
  ['mousedown', 'mousemove', 'mouseup', 'mouseleave'],
];

const Touch: FC<TouchProps> = forwardRef((props: TouchProps, ref: Ref<HTMLElement>) => {
  const {
    onStart,
    onStartX,
    onStartY,
    onMove,
    onMoveX,
    onMoveY,
    onEnd,
    onEndX,
    onEndY,
    onClick,
    useCapture,
    children,
    ...restProps
  } = props;

  const refContainer = useRef<HTMLDivElement>();
  const gesture = useRef<Partial<Gesture>>();
  const listenerParams = {
    capture: useCapture,
    passive: false,
  };

  /**
   * Обработчик событий touchstart
   */
  const handleStart: DivanTouchEventHander = useCallback(
    (e: DivanTouchEvent) => {
      gesture.current = {
        startX: coordX(e),
        startY: coordY(e),
        startT: new Date(),
        isPressed: true,
        shiftPointerX:
          (e.clientX ? e.clientX : e.touches[0].clientX) -
          (e.target as HTMLDivElement).getBoundingClientRect().left,
        shiftPointerY:
          (e.clientY ? e.clientY : e.touches[0].clientY) -
          (e.target as HTMLDivElement).getBoundingClientRect().top,
      };

      // Вызываем нужные колбеки из props
      const outputEvent = {
        ...gesture.current,
        originalEvent: e,
      };

      if (onStart) {
        onStart(outputEvent);
      }

      if (onStartX) {
        onStartX(outputEvent);
      }

      if (onStartY) {
        onStartY(outputEvent);
      }
    },
    [onStart, onStartX, onStartY],
  );

  /**
   * Обработчик событий touchend, touchcancel
   */
  const handleEnd: DivanTouchEventHander = useCallback(
    (e: DivanTouchEvent) => {
      if (!gesture.current) return;
      if (!gesture.current.isPressed) return;

      const { isSlide, isSlideX, isSlideY } = gesture.current;

      // Вызываем нужные колбеки из props
      const outputEvent: TouchEvent = {
        ...gesture.current,
        originalEvent: e,
      };

      if (onEnd) {
        onEnd(outputEvent);
      }

      if (isSlideY && onEndY) {
        onEndY(outputEvent);
      }

      if (isSlideX && onEndX) {
        onEndX(outputEvent);
      }

      // Если закончили жест на ссылке, выставляем флаг для отмены перехода
      window.cancelClick = isSlide;
      setTimeout(() => {
        window.cancelClick = false;
      }, 10);
      gesture.current = {};
    },
    [onEnd, onEndX, onEndY],
  );

  /**
   * Обработчик событий touchmove
   */
  const handleMove: DivanTouchEventHander = useCallback(
    (e: DivanTouchEvent) => {
      if (!gesture.current) return;
      if (!gesture.current.isPressed) return;

      const { isSlide, isX, isY, startX, startY } = gesture.current;

      // смещения
      const shiftX = coordX(e) - startX;
      const shiftY = coordY(e) - startY;

      // абсолютные значения смещений
      const shiftXAbs = Math.abs(shiftX);
      const shiftYAbs = Math.abs(shiftY);

      // Если определяем мультитач, то прерываем жест
      if (!!e.touches && e.touches.length > 1) {
        handleEnd(e);
        return;
      }

      // если мы ещё не определились
      if (!isX && !isY) {
        const willBeX = shiftXAbs >= 5 && shiftXAbs > shiftYAbs;
        const willBeY = shiftYAbs >= 5 && shiftYAbs > shiftXAbs;
        const willBeSlidedX = (willBeX && !!onMoveX) || !!onMove;
        const willBeSlidedY = (willBeY && !!onMoveY) || !!onMove;

        gesture.current.isY = willBeY;
        gesture.current.isX = willBeX;
        gesture.current.isSlideX = willBeSlidedX;
        gesture.current.isSlideY = willBeSlidedY;
        gesture.current.isSlide = willBeSlidedX || willBeSlidedY;
      }

      if (isSlide) {
        gesture.current.shiftX = shiftX;
        gesture.current.shiftY = shiftY;
        gesture.current.shiftXAbs = shiftXAbs;
        gesture.current.shiftYAbs = shiftYAbs;

        // Вызываем нужные колбеки из props
        const outputEvent: TouchEvent = {
          ...gesture.current,
          originalEvent: e,
        };

        if (onMove) {
          onMove(outputEvent);
          return;
        }

        if (gesture.current.isSlideX && onMoveX) {
          onMoveX(outputEvent);
          return;
        }

        if (gesture.current.isSlideY && onMoveY) {
          onMoveY(outputEvent);
        }
      }
    },
    [gesture, handleEnd, onMove, onMoveX, onMoveY],
  );

  /**
   * Обработчик событий dragstart
   * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
   */
  const handleDragStart: DragHandler = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  useImperativeHandle(ref, () => refContainer.current);

  useEffect(() => {
    function cleanup() {
      versions.forEach((events) => {
        refContainer.current.removeEventListener(events[0], handleStart, listenerParams);
        refContainer.current.removeEventListener(events[1], handleMove, listenerParams);
        refContainer.current.removeEventListener(events[2], handleEnd, listenerParams);
        refContainer.current.removeEventListener(events[3], handleEnd, listenerParams);
      });
    }

    versions.forEach((events) => {
      refContainer.current.addEventListener(events[0], handleStart, listenerParams);
      refContainer.current.addEventListener(events[1], handleMove, listenerParams);
      refContainer.current.addEventListener(events[2], handleEnd, listenerParams);
      refContainer.current.addEventListener(events[3], handleEnd, listenerParams);
    });

    return cleanup;
  }, [handleEnd, handleMove, handleStart, listenerParams]);

  return (
    <div {...restProps} onDragStart={handleDragStart} ref={refContainer}>
      {children}
    </div>
  );
});

Touch.displayName = 'Touch';

export default Touch;
