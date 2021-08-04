import React, {
  memo,
  useRef,
  useState,
  useCallback,
  FC,
  InputHTMLAttributes,
  FocusEvent,
  ChangeEvent,
  cloneElement,
  ReactElement,
} from 'react';
import cn from 'classnames';

import Input from '@UI/Input';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import HintItem from './elems/HintItem';
import styles from './InputHelper.module.css';

export interface InputHelperHint {
  id: number;
  title: string;
  data: any;
}

export interface InputHelperProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  hints: InputHelperHint[];
  loading?: boolean;
  value?: string;
  slotInput?: ReactElement;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent) => void;
  onSelectHint?: (e: MouseEvent | KeyboardEvent, hint: InputHelperHint) => void;
}

const InputHelper: FC<InputHelperProps> = (props) => {
  const {
    className,
    hints,
    loading,
    value,
    defaultValue,
    slotInput,
    onFocus,
    onBlur,
    onChange,
    onSelectHint,
    ...restProps
  } = props;

  const refOptions = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const [opened, setOpened] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useState<string>((value || defaultValue || '').toString());
  const [selectedHintIndex, setSelectedHintIndex] = useState<number>(null);

  const changeHintIndex = useCallback(
    (diff: number) => {
      setSelectedHintIndex((prevIndex) => {
        if (prevIndex === null) return 0;

        let newIndex = prevIndex + diff;

        if (newIndex < 0) newIndex = hints.length - 1;
        if (newIndex > hints.length - 1) newIndex = 0;

        return newIndex;
      });
    },
    [hints],
  );

  const handleFocus = useCallback(
    (e) => {
      setOpened(true);
      if (onFocus) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e) => {
      setTimeout(() => {
        setOpened(false);
        if (onBlur) onBlur(e);
      }, 200);
    },
    [onBlur],
  );

  const handleChange = useCallback(
    (e) => {
      setSelectedHintIndex(null);
      setInnerValue(e.target.value);

      if (onChange) onChange(e);
    },
    [onChange],
  );

  const handlePaste = useCallback(
    (e) => {
      setTimeout(() => {
        setInnerValue(refInput.current.value);

        if (onChange) onChange(e);
      }, 100);
    },
    [onChange],
  );

  const handleKeyUp = useCallback(
    (e) => {
      // Обрабатываем только нажатие на Enter
      if (e.keyCode !== 13) return;
      if (hints.length < 1) return;

      const hint = hints[selectedHintIndex];

      refInput.current.blur();

      if (!hint) return;

      setInnerValue(hint.title);

      if (onSelectHint) {
        onSelectHint(e, hint);
      }
    },
    [hints, onSelectHint, selectedHintIndex],
  );

  const handleCheckItem = useCallback(
    (e, hint) => {
      setInnerValue(hint.title);
      setOpened(false);

      if (onSelectHint) onSelectHint(e, hint);
    },
    [onSelectHint],
  );

  const handleEscape = useCallback(() => {
    if (selectedHintIndex === null) {
      refInput.current.blur();
    } else {
      setSelectedHintIndex(null);
    }
  }, [selectedHintIndex]);

  const handleArrowDown = useCallback(() => {
    if (!opened) return;

    changeHintIndex(1);
    refInput.current.focus();
  }, [changeHintIndex, opened]);

  const handleArrowUp = useCallback(() => {
    if (!opened) return;

    changeHintIndex(-1);

    // Чтобы курсор не прыгал в начало поля ввода
    setTimeout(() => {
      refInput.current.setSelectionRange(innerValue.length, innerValue.length);
    });
  }, [changeHintIndex, opened, innerValue.length]);

  const handleSpace = useCallback(
    (e) => {
      if (!opened) return;
      if (hints.length < 0) return;
      if (selectedHintIndex === null) return;

      const hint = hints[selectedHintIndex];

      e.preventDefault();
      refInput.current.blur();

      setInnerValue(hint.title);
      setSelectedHintIndex(null);
      if (onSelectHint) {
        onSelectHint(e, hint);
      }
    },
    [hints, onSelectHint, opened, selectedHintIndex],
  );

  const handleMouseEnterItem = useCallback(
    (_e, hint: InputHelperHint) => {
      const index = hints.findIndex((h) => h.id === hint.id);

      setSelectedHintIndex(index);
    },
    [hints],
  );

  const handleMouseLeaveItem = useCallback(() => {
    setSelectedHintIndex(null);
  }, []);

  useKeyboardEvents({
    onEscape: handleEscape,
    onArrowDown: handleArrowDown,
    onArrowUp: handleArrowUp,
    onSpace: handleSpace,
  });

  const inputProps = {
    ...restProps,
    value: innerValue,
    ref: refInput,
    className: styles.input,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onPaste: handlePaste,
    onKeyUp: handleKeyUp,
  };

  return (
    <div
      className={cn(
        styles.inputHelper,
        { [styles.opened]: !loading && opened && innerValue.length > 2 },
        className,
      )}
    >
      {slotInput ? (
        cloneElement(slotInput, { ...inputProps, ...slotInput.props })
      ) : (
        <Input {...inputProps} />
      )}

      <div className={styles.wrapperOptions}>
        <div ref={refOptions}>
          {hints.length > 0 ? (
            <div className={styles.options}>
              {hints.map((hint, index) => (
                <HintItem
                  key={index}
                  className={styles.option}
                  item={hint}
                  selected={selectedHintIndex === index}
                  onCheck={handleCheckItem}
                  onMouseEnter={(e) => handleMouseEnterItem(e, hint)}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  {hint.title}
                </HintItem>
              ))}
            </div>
          ) : (
            <div className={styles.notFound}>Ничего не найдено</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(InputHelper);
