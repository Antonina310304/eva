import {
  MouseEvent,
  useState,
  useEffect,
  useCallback,
  memo,
  FC,
  HTMLAttributes,
  useRef,
} from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import styles from './Droplet.module.css';

export interface ChangeXData {
  type: string;
  x: number;
}

export type DropletType = 'min' | 'max';

export interface RangeDropletProps extends HTMLAttributes<HTMLDivElement> {
  type: DropletType;
  onChangeX: (e: MouseEvent, data: ChangeXData) => void;
  onChangeEnd: (e: MouseEvent, type: DropletType) => void;
}

const RangeDroplet: FC<RangeDropletProps> = (props: RangeDropletProps) => {
  const { type, onChangeX, onChangeEnd, ...restProps } = props;
  const { isMobile } = useMedias();
  const [dragged, setDragged] = useState(false);
  const [pageX, setPageX] = useState(0);
  const [x, setX] = useState(0);
  const [xTouch, setXTouch] = useState(0);
  const refTarget = useRef<HTMLElement>(null);

  const handleMouseDown = useCallback(
    (e) => {
      if (!isMobile) {
        setPageX(e.pageX);
        setDragged(true);
        refTarget.current = e.currentTarget;
      }
    },
    [isMobile],
  );

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback(() => {
    setDragged(true);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      const finger = e.touches[0];

      if (!finger) {
        return false;
      }
      if (!xTouch) {
        return setXTouch(finger.pageX);
      }

      setX((prevX) => {
        const delta = xTouch - finger.pageX;
        const newX = prevX + delta * -1;

        if (delta === 0) {
          return prevX;
        }

        onChangeX(e, { type, x: newX - prevX });
        setXTouch(finger.pageX);

        return newX;
      });

      return null;
    },
    [xTouch, onChangeX, type],
  );

  const handleTouchEnd = useCallback(
    (e) => {
      if (dragged && onChangeEnd) {
        onChangeEnd(e, type);
      }
      setDragged(false);
    },
    [dragged, onChangeEnd, type],
  );

  const handleSelect = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Отслеживаем перемещение мыши
  useEffect(() => {
    function onMouseMove(e: any) {
      if (!dragged) {
        return;
      }

      setX((prevX) => {
        const delta = pageX - e.pageX;
        const newX = prevX + delta * -1;

        if (delta === 0) {
          return prevX;
        }

        // Заменяем таргет на таргет из onMouseDown для определения позиции элемента
        const trueEvent = { ...e, currentTarget: refTarget.current };

        onChangeX(trueEvent, { type, x: newX - prevX });
        setPageX(e.pageX);

        return newX;
      });
    }

    function onMouseUp(e: any) {
      if (dragged && onChangeEnd) {
        // Заменяем таргет на таргет из onMouseDown для определения позиции элемента
        const trueEvent = { ...e, currentTarget: refTarget.current };

        onChangeEnd(trueEvent, type);
      }
      setDragged(false);
    }

    function cleanup() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    if (isMobile) {
      return cleanup;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return cleanup;
  }, [dragged, isMobile, onChangeX, pageX, type, x, onChangeEnd]);

  return (
    <div
      {...restProps}
      className={cn(styles.droplet, {
        [styles.min]: type === 'min',
        [styles.max]: type === 'max',
        [styles.dragged]: dragged,
      })}
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onSelect={handleSelect}
    />
  );
};

export default memo(RangeDroplet);
