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
  initialSlideIndex?: number;
  slideIndex?: number;
  gap?: number;
  children: ReactElement | ReactElement[];
  onDragStart?: TouchEventHandler;
  onDragEnd?: TouchEventHandler;
  onChangeCurrent?({ current }: { current: number }): void;
  onBegin?({ current }: { current: number }): void;
  onFinish?({ current }: { current: number }): void;
}

export interface GallerySlidesState {
  coordX: number;
  width: number;
}

export interface InitialState {
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
  startT: Date;
  isDraggable: boolean;
  generalIndent: number;
}

const initialState: InitialState = {
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
  startT: new Date(),
  isDraggable: false,
  generalIndent: 0,
};

const Gallery: FC<GalleryProps> = (props: GalleryProps) => {
  const {
    className,
    initialSlideIndex,
    slideIndex,
    gap,
    children,
    onDragStart,
    onDragEnd,
    onChangeCurrent,
    onBegin,
    onFinish,
    ...restProps
  } = props;
  const refContainer = useRef<HTMLDivElement>();
  const refViewport = useRef<HTMLDivElement>();

  function reducer(state: InitialState, action) {
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
      if (!state.isDraggable) return 0;

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
     * Рассчитать что-то минимальное
     */
    function calcMin({ viewportWidth, containerWidth, layerWidth }) {
      return viewportWidth - (containerWidth - viewportWidth) / 2 - layerWidth;
    }

    /**
     * Рассчитать что-то максимальное
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
          isDraggable: data.layerWidth > data.containerWidth,
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
          isDraggable: data.layerWidth > data.containerWidth,
        };
      },

      slide: () => {
        let { current } = state;
        const { slides, max, deltaX, shiftX, startT } = state;

        if (current > slides.length - 1) {
          current = slides.length - 1;
        }

        const expectDeltaX = (deltaX / (Date.now() - startT.getTime())) * 240 * 0.6;
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

        if (onChangeCurrent && isChangeCurrent) {
          onChangeCurrent({ current: newCurrent });
        }

        if (onBegin && isChangeCurrent && newShiftX === state.max) {
          onBegin({ current: 0 });
        }

        if (onFinish && isChangeCurrent && newShiftX === state.min) {
          onFinish({ current: slides.length });
        }

        return {
          ...state,
          animation: true,
          current: newCurrent,
          deltaX: 0,
          shiftX: newShiftX,
        };
      },

      setStartT: ({ startT }) => {
        return { ...state, startT };
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

    let newState;

    if (typeof action === 'string') {
      newState = actions[action]();
    } else {
      newState = actions[action.type](action.data);
    }

    return { ...newState, generalIndent: getGeneralIndent() };
  }

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    current: typeof slideIndex === 'number' ? slideIndex : initialSlideIndex,
  });

  const storeSlides = useRef<unknown>({});
  const startT = useRef<Date>();
  const duration = 0.24;

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

    dispatch('disableAnimation');
    dispatch({ type: 'setStartT', data: { startT: e.startT } });
  }, []);

  /**
   * Движение
   */
  const handleMoveX = useCallback(
    (e: TouchEvent) => {
      if (!state.isDraggable) return;

      e.originalEvent.preventDefault();

      if (!e.isSlideX) return;

      if (onDragStart) onDragStart(e);

      dispatch({
        type: 'setDelta',
        data: { deltaX: e.shiftX },
      });
      dispatch('enableDragging');
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

  return (
    <div {...restProps} className={cn(styles.gallery, className)} ref={refContainer}>
      <Touch
        className={styles.viewport}
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
