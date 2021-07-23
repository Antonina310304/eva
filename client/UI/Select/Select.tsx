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
// import useKeyboardEvents from '@divanru/ts-utils/useKeyboardEvents';

import cn from 'classnames';
import useMedias from '@Hooks/useMedias';

import Collapse from '@UI/Collapse';
import Image from '@UI/Image';
import styles from './Select.module.css';

import IconArrow from './icons/arrow.svg';

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
  defaultChecked?: SelectItemData | SelectItemData[];
  items?: SelectItemData[];
  waiting?: boolean;
  renderItem?: (props: SelectItemData, active: boolean) => ReactElement;
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
    defaultChecked,
    items,
    className,
    waiting,
    renderItem,
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
    return Array.isArray(defaultChecked) ? defaultChecked : [defaultChecked];
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
      return Array.isArray(defaultChecked) ? defaultChecked : [defaultChecked];
    });
  }, [defaultChecked]);

  const mainRef = useOnClickOutside(handleClose);

  // useKeyboardEvents({
  //   onArrowDown: handleArrowDown,
  //   onArrowUp: handleArrowUp,
  //   onSpace: handleSpace,
  //   onEscape: handleEscape,
  // });

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
        <div
          className={cn(styles.field, {
            [styles.placeholder]: true,
          })}
          onClick={handleClick}
          ref={refField}
        >
          <div className={styles.fieldValue}>
            <div className={styles.fieldText}>
              <span className={styles.fieldTitle}>{`${title}: `}</span>
              {fieldText}
            </div>
          </div>
          {waiting ? <div className={styles.fieldLoader} /> : <div className={styles.fieldIcon} />}
        </div>

        {items.length > 0 && (
          <div className={styles.popup} style={{ ...positionPortal }}>
            <div className={styles.field} onClick={handleClick}>
              <div className={styles.fieldValue}>
                <div className={styles.fieldText}>
                  <span className={styles.fieldTitle}>{`${title}: `}</span>
                  <span className={styles.checkedValue}>{fieldText}</span>
                </div>
              </div>
              <Image className={styles.iconArrow} src={IconArrow} />
            </div>
            <Collapse collapsed={!opened}>
              <div className={styles.wrapperOptions} style={{ height: heightWrapper }}>
                <div className={styles.options} ref={refOptions}>
                  {items.map((item) => {
                    const active = item.id === checked.id;
                    const option = renderItem(item, active);

                    return cloneElement(option, {
                      ...option.props,
                      key: item.id,
                      price: 1200,
                      onCheck: handleCheckItem,
                      onUncheck: handleUncheckItem,
                    });
                  })}
                </div>
              </div>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
};

Select.defaultProps = {
  mode: 'single-required',
  wide: false,
  defaultChecked: [],
  items: [],
};

export default Select;
