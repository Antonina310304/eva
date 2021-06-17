import React, { MouseEvent, useCallback, useRef, useState, forwardRef, memo } from 'react';
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
  defaultMin: number;
  defaultMax: number;
  onChange?: (e: MouseEvent, data: ChangeData) => void;
  onChangeEnd?: (e: MouseEvent, type: DropletType) => void;
}

const [min, max] = [0, 100];
const Range = forwardRef<RangeRef, RangeProps>((props, ref) => {
  const { className, defaultMin, defaultMax, onChange, onChangeEnd, ...restProps } = props;
  const defaultGap = defaultMax - defaultMin;
  const [from, setFrom] = useState(defaultMin);
  const [to, setTo] = useState(defaultMax);
  const refDroplets = useRef<HTMLDivElement>();

  const handleChangeX = useCallback(
    (e, { type, x }) => {
      const val = (x * 100) / refDroplets.current.offsetWidth;
      const isMin = type === 'min';
      const isMax = type === 'max';

      if (isMin) {
        let newFrom = from + (val * defaultGap) / 100;

        if (newFrom < min) {
          newFrom = min;
        }
        if (newFrom >= to - 1) {
          newFrom = to - 1;
        }

        setFrom(newFrom);
      }

      if (isMax) {
        let newTo = to + (val * defaultGap) / 100;

        if (newTo > max) {
          newTo = max;
        }
        if (newTo <= from + 1) {
          newTo = from + 1;
        }

        setTo(newTo);
      }

      if (onChange) {
        onChange(e, { type, val });
      }
    },
    [defaultGap, to, from, onChange],
  );

  return (
    <div {...restProps} className={cn(styles.rangeSlider, className)} ref={ref}>
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
});

Range.displayName = 'Range';

export default memo(Range);
