import React, {
  HTMLAttributes,
  FC,
  ReactElement,
  Children,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useReducer,
  cloneElement,
} from 'react';
import cn from 'classnames';

import Touch, { TouchEvent, TouchEventHandler } from '@UI/Touch';
import styles from './Gallery.module.css';

type GetSlideRef = (index: number) => RefCallback<HTMLElement>;

export interface GalleryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onDragStart' | 'onDragEnd'> {
  className?: string;
  cnViewport?: string;
  initialSlideIndex?: number;
  slideIndex?: number;
  gap?: number;
  children: ReactElement | ReactElement[];
  onDragStart?: TouchEventHandler;
  onDragEnd?: TouchEventHandler;
  onChangeCurrent?(state: any): void;
  onChangeProgress?(params: ProgressOptions): void;
  onBegin?({ current }: { current: number }): void;
  onFinish?({ current }: { current: number }): void;
}

export interface GallerySlidesState {
  coordX: number;
  width: number;
}

export interface GalleryState {
  slides: GallerySlidesState[];
  min: number;
  max: number;
  viewportWidth: number;
  containerWidth: number;
  layerWidth: number;
  initialized: boolean;
  shiftX: number;
  deltaX: number;
  dragging: boolean;
  current: number;
  animation: boolean;
  canDrag: boolean;
  generalIndent: number;
}

export interface ProgressOptions {
  width: number;
  offset: number;
}

const initialState: GalleryState = {
  slides: [],
  min: 0,
  max: 0,
  viewportWidth: 0,
  containerWidth: 0,
  layerWidth: 0,
  initialized: false,
  shiftX: 0,
  deltaX: 0,
  dragging: false,
  current: 0,
  animation: false,
  canDrag: false,
  generalIndent: 0,
};

const Gallery: FC<GalleryProps> = (props: GalleryProps) => {
  const {
    className,
    cnViewport,
    initialSlideIndex,
    slideIndex,
    gap,
    children,
    onDragStart,
    onDragEnd,
    onChangeCurrent,
    onBegin,
    onFinish,
    onChangeProgress,
    ...restProps
  } = props;
  const refContainer = useRef<HTMLDivElement>();
  const refViewport = useRef<HTMLDivElement>();
  const startT = useRef<Date>();
  const storeSlides = useRef<unknown>({});
  const duration = 0.24;

  function reducer(state: GalleryState, action) {
    /**
     * Валидирует отступ с учётом минимального и максимального значения
     */
    const validateIndent = (value: number) => {
      const { min, max } = state;

      if (value < min) {
        return min;
      }

      if (value > max) {
        return max;
      }

      return value;
    };

    /*
     * Отступ слоя галереи
     */
    const getIndent = (current) => {
      if (!state.canDrag) return 0;

      const { slides } = state;

      const targetSlide = slides.length ? slides[current] : null;

      if (targetSlide) {
        const { coordX } = targetSlide;

        return validateIndent(-1 * coordX);
      }

      return 0;
    };

    /*
     * Отступ слоя галереи во время драга
     */
    const getDragIndent = () => {
      const { min, max, shiftX, deltaX } = state;

      const innerIndent = shiftX + deltaX;

      if (innerIndent > max) {
        return max + Number((innerIndent - max) / 3);
      }

      if (innerIndent < min) {
        return min + Number((innerIndent - min) / 3);
      }

      return innerIndent;
    };

    /**
     * Основной отступ
     */
    const getGeneralIndent = () => {
      return state.dragging ? getDragIndent() : getIndent(state.current);
    };

    /**
     * Рассчитать минимальную позицию галереи
     */
    function calcMin({ viewportWidth, containerWidth, layerWidth }) {
      return viewportWidth - (containerWidth - viewportWidth) / 2 - layerWidth;
    }

    /**
     * Рассчитать максимальную позицию галереи
     */
    function calcMax() {
      return 0;
    }

    const actions = {
      initial: (data) => {
        return {
          ...state,
          ...data,
          shiftX: getIndent(data.current),
          min: calcMin(data),
          max: calcMax(),
          canDrag: data.layerWidth > data.containerWidth,
          initialized: true,
        };
      },

      resize: (data) => {
        return {
          ...state,
          ...data,
          shiftX: getIndent(state.current),
          min: calcMin(data),
          max: calcMax(),
          canDrag: data.layerWidth > data.containerWidth,
        };
      },

      slide: () => {
        let { current } = state;
        const { slides, max, deltaX, shiftX } = state;

        if (current > slides.length - 1) {
          current = slides.length - 1;
        }

        const expectDeltaX = (deltaX / (Date.now() - startT.current.getTime())) * 240 * 0.6;
        const shift = shiftX + deltaX + expectDeltaX - max;
        const direction = deltaX < 0 ? 1 : -1;

        // Находим ближайшую границу слайда к текущему отступу
        let targetIndex = slides.reduce((val: number, item: GallerySlidesState, index: number) => {
          const previousValue = Math.abs(slides[val].coordX + shift);
          const currentValue = Math.abs(item.coordX + shift);

          return previousValue < currentValue ? val : index;
        }, current);

        if (targetIndex === current) {
          const targetSlide = current + direction;

          if (targetSlide >= 0 && targetSlide < slides.length) {
            if (Math.abs(deltaX) > slides[targetSlide].width * 0.05) {
              targetIndex = targetSlide;
            }
          }
        }

        const newShiftX = getIndent(targetIndex);
        const isChangeCurrent = newShiftX !== state.shiftX;
        const newCurrent = isChangeCurrent ? targetIndex : state.current;
        const newState = {
          ...state,
          animation: true,
          current: newCurrent,
          deltaX: 0,
          shiftX: newShiftX,
        };

        if (onChangeCurrent && isChangeCurrent) {
          onChangeCurrent(newState);
        }

        if (onBegin && isChangeCurrent && newShiftX === state.max) {
          onBegin({ current: 0 });
        }

        if (onFinish && isChangeCurrent && newShiftX === state.min) {
          onFinish({ current: slides.length });
        }

        return newState;
      },

      slideTo: ({ newCurrent }) => {
        let normalizedNewCurrent = newCurrent;

        if (normalizedNewCurrent < 0) {
          normalizedNewCurrent = 0;
        }
        if (normalizedNewCurrent > state.slides.length - 1) {
          normalizedNewCurrent = state.slides.length - 1;
        }

        const newShiftX = getIndent(normalizedNewCurrent);
        const newState = {
          ...state,
          animation: true,
          current: normalizedNewCurrent,
          deltaX: 0,
          shiftX: newShiftX,
        };

        if (onChangeCurrent) {
          onChangeCurrent(newState);
        }

        return newState;
      },

      setDelta: ({ deltaX }) => {
        return { ...state, deltaX, generalIndent: getGeneralIndent() };
      },

      resetDeltaX: () => {
        return { ...state, deltaX: 0 };
      },

      enableDragging: () => ({ ...state, dragging: true }),
      disableDragging: () => ({ ...state, dragging: false }),

      enableAnimation: () => ({ ...state, animation: true }),
      disableAnimation: () => ({ ...state, animation: false }),
    };

    const actionName = typeof action === 'string' ? action : action.type;
    const actionData = typeof action === 'string' ? undefined : action.data;
    const newState = actions[actionName](actionData);

    return { ...newState, generalIndent: getGeneralIndent() };
  }

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    current: typeof slideIndex === 'number' ? slideIndex : initialSlideIndex,
  });

  /**
   * Добавить слайд во внутреннее хранилище
   */
  const addSlideToStore: GetSlideRef = (index: number) => (slide) => {
    storeSlides.current[index] = slide;
  };

  /**
   * Получить все нужные размеры
   */
  const getSizes = useCallback(() => {
    const slides: GallerySlidesState[] = Children.map(
      children,
      (_child: ReactElement, index: number): GallerySlidesState => {
        const elem = storeSlides.current[index];

        return {
          coordX: elem.offsetLeft,
          width: elem.offsetWidth,
        };
      },
    );
    const viewportWidth = refViewport.current.offsetWidth;
    const containerWidth = refContainer.current.offsetWidth;
    const summGap = gap * (slides.length - 1);
    const layerWidth = slides.reduce(
      (val: number, slide: GallerySlidesState) => slide.width + val,
      summGap,
    );

    return {
      slides,
      viewportWidth,
      containerWidth,
      layerWidth,
    };
  }, [children, gap]);

  /**
   * Стили для подвижного слоя
   */
  const styleLayer = useMemo(() => {
    const { generalIndent } = state;

    return {
      WebkitTransform: `translateX(${generalIndent}px)`,
      transform: `translateX(${generalIndent}px)`,
      WebkitTransition: state.animation
        ? `-webkit-transform ${duration}s cubic-bezier(.1, 0, .25, 1)`
        : 'none',
      transition: state.animation ? `transform ${duration}s cubic-bezier(.1, 0, .25, 1)` : 'none',
    };
  }, [state]);

  /**
   * Начали движение
   */
  const handleStartX = useCallback((e: TouchEvent) => {
    startT.current = e.startT;
    window.draggableTarget = window.draggableTarget || refContainer.current;

    dispatch('disableAnimation');
  }, []);

  /**
   * Движение
   */
  const handleMoveX = useCallback(
    (e: TouchEvent) => {
      e.originalEvent.preventDefault();

      if (!state.canDrag) return;
      if (!e.isSlideX) return;
      if (window.draggableTarget && window.draggableTarget !== refContainer.current) return;

      dispatch({
        type: 'setDelta',
        data: { deltaX: e.shiftX },
      });
      dispatch('enableDragging');

      if (onDragStart) onDragStart(e);
    },
    [onDragStart, state],
  );

  /**
   * Закончили движение
   */
  const handleEnd = useCallback(
    (e: TouchEvent) => {
      if (e.isSlide) {
        dispatch('slide');
      }
      dispatch('disableDragging');

      window.draggableTarget = null;

      if (onDragEnd) onDragEnd(e);
    },
    [onDragEnd],
  );

  /**
   * Изменился размер страницы
   */
  const handleResize = useCallback(() => {
    dispatch({
      type: 'resize',
      data: getSizes(),
    });
  }, [getSizes]);

  /**
   * Изменение размера страницы
   */
  useEffect(() => {
    function cleanup() {
      window.removeEventListener('resize', handleResize);
    }

    window.addEventListener('resize', handleResize);

    return cleanup;
  }, [handleResize]);

  /**
   * Изменение кол-ва вложенных элементов
   */
  useEffect(() => {
    if (state.initialized) return;

    dispatch({
      type: 'resize',
      data: getSizes(),
    });
  }, [children, getSizes, state.initialized]);

  /** Генерируем событие изменения прогресса при изменении размеров и смещения */
  useEffect(() => {
    if (!onChangeProgress) return;

    let width = (state.containerWidth * 100) / state.layerWidth;

    if (width < 0) width = 0;
    if (width > 100) width = 100;

    onChangeProgress({
      width,
      offset: Math.abs(state.shiftX * 100) / state.layerWidth,
    });
  }, [onChangeProgress, state.containerWidth, state.shiftX, state.layerWidth]);

  /** Програмное изменение слайда */
  useEffect(() => {
    if (typeof slideIndex !== 'number') return;

    dispatch({ type: 'slideTo', data: { newCurrent: slideIndex } });
  }, [slideIndex]);

  return (
    <div
      {...restProps}
      className={cn(styles.gallery, { [styles.canDrag]: state.canDrag }, className)}
      ref={refContainer}
    >
      <Touch
        className={cn(styles.viewport, cnViewport)}
        ref={refViewport}
        onStartX={handleStartX}
        onMoveX={handleMoveX}
        onEnd={handleEnd}
      >
        <div className={styles.layer} style={styleLayer}>
          {Children.map(children, (child: ReactElement, index: number) => {
            const isFirst = index === 0;

            return cloneElement(child, {
              ...child.props,
              key: index,
              ref: addSlideToStore(index),
              style: isFirst || !gap ? {} : { marginLeft: `${gap}px` },
              className: cn(styles.child, child.props.className),
            });
          })}
        </div>
      </Touch>
    </div>
  );
};

Gallery.defaultProps = {
  initialSlideIndex: 0,
  gap: 0,
};

export default Gallery;
