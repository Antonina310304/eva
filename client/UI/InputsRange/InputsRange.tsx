import {
  useCallback,
  memo,
  HTMLAttributes,
  FC,
  MouseEvent,
  KeyboardEvent,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';

import Input from '@UI/Input';
import RangeSlider from '@UI/RangeSlider';
import formatPrice from '@Utils/formatPrice';
import styles from './InputsRange.module.css';

export interface OnChangeOptions {
  type: 'min' | 'max';
  percent?: number;
  value?: number;
}

export interface InputsRangeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  className?: string;
  name?: string;
  min: number;
  max: number;
  step?: number;
  valueMin: number;
  valueMax: number;
  onChange?: (e: MouseEvent, opts: OnChangeOptions) => void;
  onChangeEnd?: (e: MouseEvent) => void;
}

const formatNumber = (val: number) => formatPrice(Number(val.toFixed(0)));

const InputsRange: FC<InputsRangeProps> = (props) => {
  const {
    min,
    max,

    valueMin,
    valueMax,
    className,
    onChange,
    onChangeEnd,
    ...restProps
  } = props;
  const gap = max - min;
  const one = 100 / gap;
  const [inputValueMin, setInputValueMin] = useState(valueMin);
  const [inputValueMax, setInputValueMax] = useState(valueMax);
  const [minPercent, setMinPercent] = useState((valueMin - min) * one);
  const [maxPercent, setMaxPercent] = useState((valueMax - min) * one);

  const handleChangeRange = useCallback(
    (e, { type, val }) => {
      const isMin = type === 'min';
      const setter = isMin ? setInputValueMin : setInputValueMax;
      const value = min + gap * (val / 100);

      if (onChange) onChange(e, { type, percent: val, value });

      setter(value);
    },
    [gap, min, onChange],
  );

  const handleBlurMin = useCallback(
    (e) => {
      const val = e.target.value.replace(/\s/g, '');
      let from = parseInt(val.match(/\d+/), 10) || 0;

      if (from < min) from = min;
      if (from >= valueMax - 1) from = valueMax - 1;

      setInputValueMin(from);
      setMinPercent((from - min) * one);

      if (onChange) onChange(e, { type: 'min', value: from });
      if (onChangeEnd) onChangeEnd(e);
    },
    [min, valueMax, one, onChange, onChangeEnd],
  );

  const handleBlurMax = useCallback(
    (e) => {
      const val = e.target.value.replace(/\s/g, '');
      let to = parseInt(val.match(/\d+/), 10) || 0;

      if (to > max) to = max;
      if (to < valueMin + 1) to = valueMin + 1;

      setInputValueMax(to);
      setMaxPercent((to - min) * one);

      if (onChange) onChange(e, { type: 'max', value: to });
      if (onChangeEnd) onChangeEnd(e);
    },
    [max, valueMin, min, one, onChange, onChangeEnd],
  );

  const handleChangeMin = useCallback((e) => {
    const val = Number(e.target.value.replace(/\s/g, ''));

    setInputValueMin(val);
  }, []);

  const handleChangeMax = useCallback(
    (e) => {
      const val = Number(e.target.value.replace(/\s/g, ''));

      setInputValueMax(val);
    },
    [setInputValueMax],
  );

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const inputName = e.currentTarget.dataset.name;
      const handler = inputName === 'from' ? handleBlurMin : handleBlurMax;

      handler(e);
    },
    [handleBlurMax, handleBlurMin],
  );

  // TODO: Вынести в пропсу для Input
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        handleEnter(e);
      }

      // Разрешаем: backspace, delete, tab и escape
      if (
        e.keyCode === 46 ||
        e.keyCode === 8 ||
        e.keyCode === 9 ||
        e.keyCode === 27 ||
        // Разрешаем: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Разрешаем: home, end, влево, вправо
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // Ничего не делаем
      } else if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    },
    [handleEnter],
  );

  useEffect(() => {
    setInputValueMin(valueMin);
    setInputValueMax(valueMax);
    setMinPercent((valueMin - min) * one);
    setMaxPercent((valueMax - min) * one);
  }, [valueMin, valueMax, min, one]);

  return (
    <div {...restProps} className={cn(styles.inputsRange, className)}>
      <div className={styles.inputs}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputBefore}>от</div>
          <Input
            className={styles.input}
            value={formatNumber(inputValueMin)}
            data-name='from'
            onChange={handleChangeMin}
            onBlur={handleBlurMin}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.inputBefore}>до</div>
          <Input
            className={styles.input}
            value={formatNumber(inputValueMax)}
            data-name='to'
            onChange={handleChangeMax}
            onBlur={handleBlurMax}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <RangeSlider
        min={minPercent}
        max={maxPercent}
        onChange={handleChangeRange}
        onChangeEnd={onChangeEnd}
      />
    </div>
  );
};

export default memo(InputsRange);
