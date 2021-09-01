import React, {
  FC,
  useState,
  useCallback,
  MouseEvent,
  useRef,
  useEffect,
  ReactElement,
  useMemo,
} from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import FadeTransition from '@UI/FadeTransition';
import SlideBottomTransition from '@UI/SlideBottomTransition';
import UniversalPortal from '@UI/UniversalPortal';
import Image from '@UI/Image';
import styles from './Select.module.css';
import Popup from './elements/Popup';

import IconArrow from './icons/arrow.svg';

export type SelectCallback = (e: MouseEvent, item: SelectItemData) => void;

export interface SelectItemData {
  id: string;
  title: string;
  href?: string;
  image?: string;
  name: string;
  price?: number;
  data?: unknown;
  active?: boolean;
  selected?: boolean;
}

export interface SelectProps {
  className?: string;
  mode?: 'single' | 'single-required' | 'multiple';
  disabled?: boolean;
  portal?: boolean;
  wide?: boolean;
  name?: string;
  title?: string;
  defaultChecked?: SelectItemData | SelectItemData[];
  items?: SelectItemData[];
  waiting?: boolean;
  renderItem?: (props: SelectItemData) => ReactElement;
  onClick?: (e: MouseEvent) => void;
  onOpen?: (e: MouseEvent) => void;
  onClose?: (e: MouseEvent) => void;
  onCheck?: SelectCallback;
  onChangeSelected?: (e: MouseEvent, items: SelectItemData[]) => void;
  onClickItem?: SelectCallback;
}

const Select: FC<SelectProps> = (props: SelectProps) => {
  const {
    mode = 'single',
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
    onChangeSelected,
    ...restProps
  } = props;
  const { isMobile } = useMedias();
  const refField = useRef<HTMLDivElement>();
  const [checked, setChecked] = useState<SelectItemData[]>(() => {
    return Array.isArray(defaultChecked) ? defaultChecked : [defaultChecked];
  });
  const [opened, setOpened] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [positionPortal, setPositionPortal] = useState({ width: '100%' });
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(null);
  const refTop = useRef(0);

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
        let newItems = [item];

        if (mode === 'multiple') {
          newItems = [...prev, item];
        }

        if (onChangeSelected) onChangeSelected(null, newItems);

        return newItems;
      });
    },
    [mode, onChangeSelected],
  );

  const uncheckItem = useCallback(
    (item: SelectItemData) => {
      setChecked((prev) => {
        const newItems = [...prev];

        if (mode !== 'single-required' && prev[0].id === item.id) {
          const itemIndex = prev.findIndex(({ id }) => item.id === id);

          newItems.splice(itemIndex, 1);
        }

        if (mode === 'multiple' && prev[0].id !== item.id) {
          const itemIndex = prev.findIndex(({ id }) => item.id === id);

          newItems.splice(itemIndex, 1);
        }

        if (onChangeSelected) onChangeSelected(null, newItems);

        return newItems;
      });
    },
    [mode, onChangeSelected],
  );

  const handleUnblockScroll = useCallback(() => {
    document.documentElement.style.position = '';
    document.documentElement.style.top = '';
    document.documentElement.style.width = '';
    window.scrollTo(0, refTop.current);
  }, []);

  const handleClose = useCallback(
    (e?: MouseEvent) => {
      setOpened(false);
      changeFocusedItemIndex(null);

      if (onClose) onClose(e);

      if (isMobile) handleUnblockScroll();
    },
    [changeFocusedItemIndex, isMobile, handleUnblockScroll, onClose],
  );

  const handleBlockScroll = useCallback(() => {
    document.documentElement.style.top = `-${refTop.current}px`;
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.width = '100%';
  }, []);

  const handleOpen = useCallback(
    (e: MouseEvent) => {
      refTop.current = refTop.current || window.scrollY;
      setOpened(true);

      if (onOpen) onOpen(e);

      if (isMobile) handleBlockScroll();
    },
    [isMobile, onOpen, handleBlockScroll],
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

  const handleClickItem = useCallback(
    (e: MouseEvent, item: SelectItemData) => {
      const hasInChecked = checked.includes(item);

      if (hasInChecked) {
        uncheckItem(item);
      } else {
        checkItem(item);

        if (mode !== 'multiple') handleClose(e);
      }
    },
    [checkItem, checked, handleClose, mode, uncheckItem],
  );

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
    },
    [
      changeFocusedItemIndex,
      checkItem,
      checked,
      focusedItemIndex,
      handleClose,
      items,
      mode,
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

  useEffect(() => setInitialized(true), []);

  useEffect(() => {
    setTimeout(() => {
      setPositionPortal((prev) => {
        if (isMobile || !portal || !refField) return prev;

        const rect = refField.current.getBoundingClientRect();

        return {
          top: window.pageYOffset + rect.y + rect.height + 1,
          left: rect.left - 1,
          width: `${rect.width}px`,
        };
      });
    }, 10);
  }, [initialized, isMobile, opened, portal]);

  // Изменяем внутреннее состояние при изменении пропсов
  useEffect(() => {
    setChecked(() => {
      return Array.isArray(defaultChecked) ? defaultChecked : [defaultChecked];
    });
  }, [defaultChecked]);

  useEffect(() => {
    if (isMobile && opened) {
      handleBlockScroll();
    } else {
      document.documentElement.style.position = '';
      document.documentElement.style.top = '';
      document.documentElement.style.width = '';
    }
  }, [isMobile, opened, handleBlockScroll]);

  const mainRef = useOnClickOutside(handleClose, !opened);

  useKeyboardEvents({
    onArrowDown: handleArrowDown,
    onArrowUp: handleArrowUp,
    onSpace: handleSpace,
    onEscape: handleEscape,
  });

  return (
    <div
      ref={mainRef}
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
      <div className={styles.wrapper}>
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
              {title && <span className={styles.fieldTitle}>{`${title}: `}</span>}
              {fieldText}
            </div>
          </div>
          <Image className={styles.iconArrow} src={IconArrow} />
        </div>

        {items.length > 0 && (
          <UniversalPortal condition={portal || (isMobile && initialized)}>
            <>
              {isMobile ? (
                <>
                  <FadeTransition in={opened} unmountOnExit>
                    <div className={styles.backdrop} onClick={handleClose} />
                  </FadeTransition>
                  <SlideBottomTransition in={opened} unmountOnExit>
                    <div className={styles.popup} style={{ ...positionPortal }}>
                      <Popup
                        items={items}
                        checked={checked}
                        opened={opened}
                        wide={wide}
                        disabled={disabled}
                        faked={faked}
                        title={title}
                        fieldText={fieldText}
                        isMobile={isMobile}
                        renderItem={renderItem}
                        onClickField={handleClick}
                        onClickItem={handleClickItem}
                      />
                    </div>
                  </SlideBottomTransition>
                </>
              ) : (
                <Popup
                  className={styles.popup}
                  style={{ ...positionPortal }}
                  items={items}
                  checked={checked}
                  opened={opened}
                  wide={wide}
                  disabled={disabled}
                  faked={faked}
                  title={title}
                  fieldText={fieldText}
                  isMobile={isMobile}
                  renderItem={renderItem}
                  onClickField={handleClick}
                  onClickItem={handleClickItem}
                />
              )}
            </>
          </UniversalPortal>
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
