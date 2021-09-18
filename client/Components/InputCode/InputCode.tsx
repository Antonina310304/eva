import {
  FC,
  InputHTMLAttributes,
  memo,
  useMemo,
  useCallback,
  useRef,
  useState,
  FormEvent,
  useEffect,
} from 'react';
import cn from 'classnames';

import styles from './InputCode.module.css';

export interface InputCodeProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  countNumbers?: number;
  error?: string;
  onInput?: (e: FormEvent) => void;
  onComplete?: (value: string) => void;
}

export type RefInputs = HTMLInputElement[];

const InputCode: FC<InputCodeProps> = (props) => {
  const {
    className,
    countNumbers = 4,
    value,
    autoFocus,
    error,
    readOnly,
    onInput,
    onComplete,
    ...restProps
  } = props;
  const inputs = useRef<RefInputs>([]);
  const [update, setUpdate] = useState(1);

  const finalValue = inputs.current.map((input) => input.value).join('');

  const codes = useMemo(() => {
    const arr: number[] = [];

    for (let i = 0; i < countNumbers; i += 1) {
      arr.push(i);
    }

    return arr;
  }, [countNumbers]);

  const addInputRef = (index: number) => (inputRef: HTMLInputElement) => {
    inputs.current[index] = inputRef;
  };

  const normalizeIndex = useCallback((index: number) => {
    const lastIndex = inputs.current.length - 1;

    if (index < 0) return 0;
    if (index > lastIndex) return lastIndex;

    return index;
  }, []);

  const changeFocus = useCallback(() => {
    const freeIndex = inputs.current.findIndex((input) => !input.value);
    const lastIndex = inputs.current.length - 1;
    const resultIndex = freeIndex > -1 ? freeIndex : lastIndex;

    inputs.current[normalizeIndex(resultIndex)].focus();
  }, [normalizeIndex]);

  const handleInput = useCallback(
    (e) => {
      changeFocus();
      setUpdate((prev) => prev + 1);

      if (onInput) onInput(e);
    },
    [changeFocus, onInput],
  );

  const handleFocus = useCallback(() => {
    changeFocus();
  }, [changeFocus]);

  const handleKeyDown = useCallback(
    (e, index: number) => {
      if (readOnly) return;

      // Только цифры и Backspace
      const allowedKeyCodes = [
        8,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
      ];
      const isBackspace = e.keyCode === 8;

      if (!allowedKeyCodes.includes(e.keyCode)) {
        e.preventDefault();
      }

      if (isBackspace) {
        const currentInput = inputs.current[normalizeIndex(index)];
        const prevInput = inputs.current[normalizeIndex(index - 1)];

        if (currentInput.value) {
          currentInput.value = '';
        } else {
          prevInput.value = '';
        }
        changeFocus();
      }
    },
    [changeFocus, normalizeIndex, readOnly],
  );

  const handleClickCodeWrapper = useCallback((e, index) => {
    inputs.current[index].focus();
  }, []);

  useEffect(() => {
    if (finalValue.length !== inputs.current.length) return;
    if (!onComplete) return;

    onComplete(finalValue);
  }, [finalValue, onComplete, update]);

  useEffect(() => {
    if (!autoFocus) return;

    changeFocus();
  }, [autoFocus, changeFocus]);

  return (
    <div
      className={cn(
        styles.inputCode,
        { [styles.errored]: !!error, [styles.readOnly]: readOnly },
        className,
      )}
    >
      <input
        {...restProps}
        className={styles.control}
        readOnly={readOnly}
        type='hidden'
        value={value || finalValue}
      />

      <div className={styles.codes}>
        {codes.map((index) => (
          <div
            className={styles.codeWrapper}
            key={index}
            onClick={(e) => handleClickCodeWrapper(e, index)}
          >
            <input
              className={styles.code}
              ref={addInputRef(index)}
              type='tel'
              maxLength={1}
              pattern='[0-9]'
              defaultValue={value ? String(value).substring(index, index + 1) : undefined}
              readOnly={readOnly}
              onInput={handleInput}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          </div>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default memo(InputCode);
