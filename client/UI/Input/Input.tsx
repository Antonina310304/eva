import React, {
  forwardRef,
  useCallback,
  useEffect,
  memo,
  InputHTMLAttributes,
  MutableRefObject,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

export type InputRef = HTMLInputElement;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  before?: string;
  after?: string;
  wide?: boolean;
  mask?: string;
  error?: string;
  size?: 'l' | 'm' | 's';
  onBeforePaste?: (pastedValue: string, opts: any) => string;
}

const Input = forwardRef<InputRef, InputProps>((props, ref: MutableRefObject<HTMLInputElement>) => {
  const {
    className,
    before,
    after,
    wide,
    mask,
    error,
    size,
    readOnly,
    onFocus,
    onBlur,
    onBeforePaste,
    ...restProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleClick = useCallback((e) => {
    const input = e.currentTarget.querySelector('input');

    input.focus();
  }, []);

  const handleFocus = useCallback(
    (e) => {
      if (readOnly) return;

      setFocused(true);

      if (onFocus) onFocus(e);
    },
    [onFocus, readOnly],
  );

  const handleBlur = useCallback(
    (e) => {
      if (readOnly) return;

      setFocused(false);

      if (onBlur) onBlur(e);
    },
    [onBlur, readOnly],
  );

  // Загружаем маску для поля ввода
  useEffect(() => {
    if (!mask) return;
    if (!inputRef.current) return;

    async function loadInputMask() {
      const InputMask = (await import('inputmask')).default;
      const im = new InputMask(mask, { showMaskOnHover: false, onBeforePaste });

      if (inputRef.current) {
        im.mask(inputRef.current);
      }
    }

    loadInputMask();
  }, [inputRef, mask, onBeforePaste]);

  useImperativeHandle(ref, () => inputRef.current);

  return (
    <>
      <div
        className={cn(
          styles.input,
          {
            [styles.wide]: wide,
            [styles.focused]: focused,
            [styles.readonly]: readOnly,
            [styles.errored]: !!error,
            [styles.sizeL]: size === 'l',
            [styles.sizeM]: size === 'm',
            [styles.sizeS]: size === 's',
          },
          [className],
        )}
        onClick={handleClick}
      >
        {before && <span className={styles.before}>{before}</span>}
        <input
          {...restProps}
          className={styles.control}
          ref={inputRef}
          readOnly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {after && <span className={styles.after}>{after}</span>}
        {error && <div className={styles.iconError} />}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
});

Input.displayName = 'Input';

export default memo(Input);
