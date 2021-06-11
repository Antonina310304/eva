/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  DragEvent,
  MouseEvent,
  FC,
  useCallback,
  useEffect,
  ElementType,
  ReactChild,
  HTMLAttributes,
  useRef,
  useImperativeHandle,
  forwardRef,
  Ref,
} from 'react';

import {
  supportedEvents,
  coordX,
  coordY,
  touchEnabled,
  DivanTouchEvent,
  DivanTouchEventHander,
} from './lib';

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
  Component?: ElementType;
  children?: ReactChild;
  ref?: Ref<HTMLElement>;
}

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
    Component,
    children,
    ...restProps
  } = props;

  const cancelClick = useRef(false);
  const refContainer = useRef<HTMLElement>();
  const gesture = useRef<Partial<Gesture>>();
  const events = supportedEvents();
  const listenerParams = {
    capture: useCapture,
    passive: false,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subscribe = (element: HTMLElement) => {
    element.addEventListener(events[1], handleMove, listenerParams);
    element.addEventListener(events[2], handleEnd, listenerParams);
    element.addEventListener(events[3], handleEnd, listenerParams);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unsubscribe = (element: HTMLElement) => {
    element.removeEventListener(events[1], handleMove, listenerParams);
    element.removeEventListener(events[2], handleEnd, listenerParams);
    element.removeEventListener(events[3], handleEnd, listenerParams);
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

      if (!touchEnabled) subscribe(window.document.documentElement);
    },
    [onStart, onStartX, onStartY, subscribe],
  );

  /**
   * Обработчик событий touchend, touchcancel
   */
  const handleEnd: DivanTouchEventHander = useCallback(
    (e: DivanTouchEvent) => {
      const { isPressed, isSlide, isSlideX, isSlideY } = gesture.current;

      if (isPressed) {
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
      }

      const target = e.target as HTMLElement;

      // Если закончили жест на ссылке, выставляем флаг для отмены перехода
      cancelClick.current = target.tagName === 'A' && isSlide;
      gesture.current = {};

      if (!touchEnabled) unsubscribe(window.document.documentElement);
    },
    [onEnd, onEndX, onEndY, unsubscribe],
  );

  /**
   * Обработчик событий touchmove
   */
  const handleMove: DivanTouchEventHander = useCallback(
    (e: DivanTouchEvent) => {
      const { isPressed, isX, isY, startX, startY } = gesture.current;

      if (isPressed) {
        // смещения
        const shiftX = coordX(e) - startX;
        const shiftY = coordY(e) - startY;

        // абсолютные значения смещений
        const shiftXAbs = Math.abs(shiftX);
        const shiftYAbs = Math.abs(shiftY);

        // Если определяем мультитач, то прерываем жест
        if (!!e.touches && e.touches.length > 1) {
          return handleEnd(e);
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

        if (gesture.current.isSlide) {
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
            return onMove(outputEvent);
          }

          if (gesture.current.isSlideX && onMoveX) {
            return onMoveX(outputEvent);
          }

          if (gesture.current.isSlideY && onMoveY) {
            return onMoveY(outputEvent);
          }
        }
      }

      return null;
    },
    [gesture, handleEnd, onMove, onMoveX, onMoveY],
  );

  /**
   * Обработчик событий dragstart
   * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
   */
  const handleDragStart: DragHandler = useCallback((e: DragEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'A' || target.tagName === 'IMG') {
      e.preventDefault();
    }
  }, []);

  /**
   * Обработчик клика по компоненту
   * Отменяет переход по вложенной ссылке, если был зафиксирован свайп
   */
  const handleClick: ClickHandler = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (cancelClick) {
        cancelClick.current = false;
        e.preventDefault();
      }

      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  /**
   *
   */
  useImperativeHandle(ref, () => refContainer.current);

  /**
   *
   */
  useEffect(() => {
    function cleanup() {
      refContainer.current.removeEventListener(events[0], handleStart, listenerParams);

      if (touchEnabled) unsubscribe(refContainer.current);
    }

    refContainer.current.addEventListener(events[0], handleStart, listenerParams);

    if (touchEnabled) subscribe(refContainer.current);

    return cleanup;
  }, [events, handleStart, listenerParams, subscribe, unsubscribe]);

  return (
    <Component
      {...restProps}
      onDragStart={handleDragStart}
      onClick={handleClick}
      ref={refContainer}
    >
      {children}
    </Component>
  );
});

Touch.displayName = 'Touch';
Touch.defaultProps = {
  Component: 'div',
  children: '',
};

export default Touch;
