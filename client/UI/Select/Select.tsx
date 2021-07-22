import React, {
  FC,
  HTMLAttributes,
  useState,
  useCallback,
  MouseEvent,
  useRef,
  useEffect,
  ReactElement,
  cloneElement,
  useMemo,
} from 'react';
import useOnClickOutside from '@divanru/ts-utils/useOnClickOutside';
import useKeyboardEvents from '@divanru/ts-utils/useKeyboardEvents';

import Icon5ArrowDown from '@divanru/icons/dist/5/arrow_down';

import cn from 'classnames';
import useMedias from '@Hooks/useMedias';

import styles from './StringParameter.module.css';

export type SelectCallback = (e: MouseEvent, item: SelectItemData) => void;

export interface SelectItemData {
  id: string;
  title: string;
  data?: unknown;
  icon?: ReactElement;
  href?: string;
  price?: number;
  currency?: 'RUB' | 'BYN';
}

export interface SelectProps extends HTMLAttributes<HTMLInputElement> {
  className?: string;
  mode?: 'single' | 'single-required' | 'multiple';
  disabled?: boolean;
  portal?: boolean;
  wide?: boolean;
  name?: string;
  title?: string;
  countVisible?: number;
  checked?: SelectItemData | SelectItemData[];
  items?: SelectItemData[];
  hardPlaceholder?: string;
  slotField?: ReactElement;
  ssr?: boolean;
  waiting?: boolean;
  onClick?: (e: MouseEvent) => void;
  onOpen?: (e: MouseEvent) => void;
  onClose?: (e: MouseEvent) => void;
  onCheck?: SelectCallback;
  onUncheck?: SelectCallback;
  onClickItem?: SelectCallback;
}

const Select: FC<SelectProps> = (props: SelectProps) => {
  const {
    mode,
    disabled,
    portal,
    title,
    wide,
    checked: propsChecked,
    items,
    hardPlaceholder,
    className,
    slotField,
    ssr,
    waiting,
    onClick,
    onOpen,
    onClose,
    onCheck,
    onUncheck,
    ...restProps
  } = props;
  const { isOnlyMobile } = useMedias();
  const refField = useRef<HTMLDivElement>();
  const refOptions = useRef<HTMLDivElement>();
  const [checked, setChecked] = useState<SelectItemData[]>(() => {
    return Array.isArray(propsChecked) ? propsChecked : [propsChecked];
  });
  const [opened, setOpened] = useState(false);
  const [heightWrapper, setHeightWrapper] = useState<string | number>('100%');
  const [initialized, setInitialized] = useState(false);
  const [positionPortal, setPositionPortal] = useState({ width: '100%' });
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(null);

  const faked = useMemo(() => {
    const [firstItem] = items;
    const firstIsChecked = checked.find(({ id }) => id === firstItem?.id);

    return Boolean(mode === 'single-required' && items.length === 1 && firstIsChecked);
  }, [checked, items, mode]);

  // Формируем текст выбранных опций
  const fieldText = useMemo(() => {
    let result = '';
    if (checked.length) {
      result = items
        .filter((item) => checked.find(({ id }) => item.id === id))
        .map((item) => item.title)
        .join(', ');
    }
    if (result.length === 0) {
      result = title;
    }
    return result;
  }, [checked, items, title]);

  // Формируем иконку для выбранной опции
  const FieldImg = useMemo(() => {
    if (mode === 'multiple') return null;
    if (checked.find((item) => item.icon)) {
      return checked.find((item) => item.icon).icon;
    }
    return null;
  }, [checked, mode]);

  // Формируем value выбранных опций
  const inputValue = useMemo(() => {
    let result = '';
    if (checked.length) {
      result = items
        .filter((item) => checked.find(({ id }) => item.id === id))
        .map((item) => item.id)
        .join(', ');
    }
    if (result.length === 0) {
      result = '';
    }
    return result;
  }, [checked, items]);

  const changeFocusedItemIndex = useCallback(
    (diff: number) => {
      setFocusedItemIndex((prevIndex) => {
        if (!diff) return null;
        if (prevIndex === null && diff > 0) return 0;
        if (prevIndex === null && diff < 0) return items.length - 1;

        let newIndex = prevIndex + diff;

        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex > items.length - 1) newIndex = 0;

        return newIndex;
      });
    },
    [items],
  );

  const checkItem = useCallback(
    (item: SelectItemData) => {
      setChecked((prev) => {
        if (mode === 'multiple') {
          return [...prev, item];
        }

        return [item];
      });
    },
    [mode],
  );

  const uncheckItem = useCallback(
    (item: SelectItemData) => {
      setChecked((prev) => {
        if (mode === 'single-required' && prev[0].id === item.id) {
          return prev;
        }

        const itemIndex = prev.findIndex(({ id }) => item.id === id);
        const newItems = [...prev];

        newItems.splice(itemIndex, 1);

        return newItems;
      });
    },
    [mode],
  );

  const handleClose = useCallback(
    (e?: MouseEvent) => {
      setOpened(false);
      changeFocusedItemIndex(null);

      if (onClose) onClose(e);
    },
    [changeFocusedItemIndex, onClose],
  );

  const handleOpen = useCallback(
    (e: MouseEvent) => {
      setOpened(true);

      if (onOpen) onOpen(e);
    },
    [onOpen],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (disabled || faked) return;

      if (opened) {
        handleClose(e);
      } else {
        handleOpen(e);
      }

      if (onClick) onClick(e);
    },
    [disabled, faked, opened, onClick, handleClose, handleOpen],
  );

  const handleCheckItem = useCallback(
    (e: MouseEvent, item: SelectItemData) => {
      checkItem(item);

      if (mode !== 'multiple') handleClose(e);
      if (onCheck) onCheck(e, item);
    },
    [checkItem, handleClose, mode, onCheck],
  );

  const handleUncheckItem = useCallback(
    (e: MouseEvent, item: SelectItemData) => {
      uncheckItem(item);

      if (onUncheck) onUncheck(e, item);
    },
    [onUncheck, uncheckItem],
  );

  const handleMouseEnterItem = useCallback(
    (_e, eventItem: SelectItemData) => {
      const index = items.findIndex((item) => item.id === eventItem.id);

      setFocusedItemIndex(index);
    },
    [items],
  );

  const handleMouseLeaveItem = useCallback(() => {
    setFocusedItemIndex(null);
  }, []);

  const handleArrowDown = useCallback(
    (e) => {
      if (!opened) return;

      e.preventDefault();
      changeFocusedItemIndex(1);
    },
    [changeFocusedItemIndex, opened],
  );

  const handleArrowUp = useCallback(
    (e) => {
      if (!opened) return;

      e.preventDefault();
      changeFocusedItemIndex(-1);
    },
    [changeFocusedItemIndex, opened],
  );

  const handleSpace = useCallback(
    (e) => {
      if (!opened) return;

      const item = items[focusedItemIndex];

      e.preventDefault();

      if (checked.find((checkedItem) => checkedItem.id === item.id)) {
        uncheckItem(item);
      } else {
        checkItem(item);

        if (item.href) {
          window.location.href = item.href;
        }
      }

      if (mode !== 'multiple') {
        changeFocusedItemIndex(null);
        handleClose(e);
      }
      if (onCheck) onCheck(e, item);
    },
    [
      changeFocusedItemIndex,
      checkItem,
      checked,
      focusedItemIndex,
      handleClose,
      items,
      mode,
      onCheck,
      opened,
      uncheckItem,
    ],
  );

  const handleEscape = useCallback(
    (e) => {
      if (focusedItemIndex === null) {
        handleClose(e);
        return;
      }

      changeFocusedItemIndex(null);
    },
    [changeFocusedItemIndex, focusedItemIndex, handleClose],
  );

  //
  useEffect(() => setInitialized(true), []);

  //
  useEffect(() => {
    setTimeout(() => {
      setHeightWrapper((prev) => {
        if (!refOptions || !refOptions.current) return prev;

        return refOptions.current.offsetHeight;
      });

      setPositionPortal((prev) => {
        if (isOnlyMobile || !portal || !refField) return prev;

        const rect = refField.current.getBoundingClientRect();

        return {
          top: window.pageYOffset + rect.y + rect.height + 1,
          left: rect.left - 1,
          width: `${rect.width}px`,
        };
      });
    }, 10);
  }, [initialized, isOnlyMobile, opened, portal]);

  // Изменяем внутреннее состояние при изменении пропсов
  useEffect(() => {
    setChecked(() => {
      return Array.isArray(propsChecked) ? propsChecked : [propsChecked];
    });
  }, [propsChecked]);

  const mainRef = useOnClickOutside(handleClose, !opened || isOnlyMobile, []);

  useKeyboardEvents({
    onArrowDown: handleArrowDown,
    onArrowUp: handleArrowUp,
    onSpace: handleSpace,
    onEscape: handleEscape,
  });

  return (
    <div
      className={cn(
        styles.select,
        {
          [styles.opened]: opened,
          [styles.wide]: wide,
          [styles.disabled]: disabled,
          [styles.faked]: faked,
        },
        className,
      )}
    >
      <div className={styles.wrapper} ref={mainRef}>
        <input {...restProps} className={styles.control} value={inputValue} readOnly />
        {slotField ? (
          cloneElement(slotField, {
            ref: refField,
            text: hardPlaceholder || fieldText,
            onClick: handleClick,
            opened,
          })
        ) : (
          <div className={styles.field} onClick={handleClick} ref={refField}>
            <div className={styles.fieldValue}>
              {FieldImg && <div className={styles.fieldImg}>{FieldImg}</div>}
              <div className={styles.fieldText}>{hardPlaceholder || fieldText}</div>
            </div>
            {waiting ? (
              <div className={styles.fieldLoader} />
            ) : (
              <div className={styles.fieldIcon}>
                <Icon5ArrowDown width={10} height={10} />
              </div>
            )}
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className={styles.backdrop} onClick={handleClose} />

            <div className={styles.popup} style={{ ...positionPortal }}>
              {isOnlyMobile && (
                <div className={styles.head}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.close} />
                </div>
              )}
              <div className={styles.wrapperOptions} style={{ height: heightWrapper }}>
                <div className={styles.options} ref={refOptions}>
                  renderItem
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Select.defaultProps = {
  mode: 'single-required',
  wide: false,
  checked: [],
  items: [],
  ssr: false,
};

export default Select;
