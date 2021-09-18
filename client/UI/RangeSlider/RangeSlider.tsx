import { MouseEvent, useCallback, useRef, useState, FC, memo, useEffect } from 'react';
import cn from 'classnames';

import Droplet, { DropletType } from './elements/Droplet';
import styles from './RangeSlider.module.css';

export type RangeRef = HTMLDivElement;

export interface ChangeData {
  type: string;
  val: number;
}

export interface RangeProps {
  className?: string;
  defaultMin?: number;
  defaultMax?: number;
  min?: number;
  max?: number;
  onChange?: (e: MouseEvent, data: ChangeData) => void;
  onChangeEnd?: (e: MouseEvent, type: DropletType) => void;
}

const Range: FC<RangeProps> = (props) => {
  const {
    className,
    defaultMin,
    defaultMax,
    min,
    max,
    onChange,
    onChangeEnd,
    ...restProps
  } = props;
  const trueMin = min || defaultMin || 0;
  const trueMax = max || defaultMax || 100;
  const gap = Math.abs(trueMax - trueMin);
  const [from, setFrom] = useState(trueMin);
  const [to, setTo] = useState(trueMax);
  const refDroplets = useRef<HTMLDivElement>();

  const handleChangeX = useCallback(
    (e, { type, x }) => {
      const val = (x * 100) / refDroplets.current.offsetWidth;
      const isMin = type === 'min';
      const isMax = type === 'max';

      if (isMin) {
        let newFrom = from + (val * gap) / 100;

        if (newFrom < 0) {
          newFrom = 0;
        }
        if (newFrom >= to - 1) {
          newFrom = to - 1;
        }
        if (onChange) onChange(e, { type, val: newFrom });

        setFrom(newFrom);
      }

      if (isMax) {
        let newTo = to + (val * gap) / 100;

        if (newTo > 100) {
          newTo = 100;
        }
        if (newTo <= from + 1) {
          newTo = from + 1;
        }
        if (onChange) onChange(e, { type, val: newTo });

        setTo(newTo);
      }
    },
    [gap, to, from, onChange],
  );

  useEffect(() => {
    setFrom(min);
    setTo(max);
  }, [max, min]);

  return (
    <div {...restProps} className={cn(styles.rangeSlider, className)}>
      <div className={styles.line} />

      <div className={styles.droplets} ref={refDroplets}>
        <div
          className={cn(styles.line, { [styles.active]: true })}
          style={{ left: `${from}%`, right: `${100 - to}%` }}
        />
        <Droplet
          type='min'
          style={{ left: `${from}%` }}
          onChangeX={handleChangeX}
          onChangeEnd={onChangeEnd}
        />
        <Droplet
          type='max'
          style={{ left: `${to}%` }}
          onChangeX={handleChangeX}
          onChangeEnd={onChangeEnd}
        />
      </div>
    </div>
  );
};

Range.displayName = 'Range';

export default memo(Range);
