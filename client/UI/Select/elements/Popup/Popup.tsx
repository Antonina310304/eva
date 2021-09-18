import {
  FC,
  memo,
  cloneElement,
  useCallback,
  MouseEvent,
  useState,
  useEffect,
  useRef,
  ReactElement,
  HTMLAttributes,
} from 'react';
import cn from 'classnames';

import Image from '@UI/Image/Image';
import IconArrow from '@UI/Select/icons/arrow.svg';
import Collapse from '@UI/Collapse';
import Scroller from '@UI/Scroller';
import { SelectItemData } from '@UI/Select';
import styles from './Popup.module.css';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  opened?: boolean;
  wide?: boolean;
  disabled?: boolean;
  faked?: boolean;
  title: string;
  fieldText: string;
  isMobile: boolean;
  items?: SelectItemData[];
  checked: SelectItemData[];
  renderItem?: (props: SelectItemData) => ReactElement;
  onClickField?: (e: MouseEvent) => void;
  onClickItem?: (e: MouseEvent, item: SelectItemData) => void;
}

const Popup: FC<PopupProps> = (props) => {
  const {
    className,
    opened,
    wide,
    disabled,
    faked,
    title,
    fieldText,
    isMobile,
    items,
    checked,
    renderItem,
    onClickItem,
    onClickField,
    ...restProps
  } = props;
  const [heightWrapper, setHeightWrapper] = useState<string | number>('100%');
  const refOptions = useRef<HTMLDivElement>();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (onClickField) onClickField(e);
    },
    [onClickField],
  );

  useEffect(() => {
    setTimeout(() => {
      setHeightWrapper((prev) => {
        if (!refOptions || !refOptions.current) return prev;

        return refOptions.current.offsetHeight;
      });
    }, 10);
  }, []);

  return (
    <div
      {...restProps}
      className={cn(
        styles.popup,
        {
          [styles.opened]: opened,
          [styles.wide]: wide,
          [styles.disabled]: disabled,
          [styles.faked]: faked,
          [styles.checked]: checked.length > 0,
        },
        className,
      )}
    >
      <div className={styles.field} onClick={handleClick}>
        <div className={styles.fieldValue}>
          <div className={styles.fieldText}>
            {title && (
              <span className={styles.fieldTitle}>
                {' '}
                {`${title}${fieldText?.length > 0 ? ': ' : ''}`}
              </span>
            )}
            <span className={styles.checkedValue}>{fieldText}</span>
          </div>
        </div>
        <Image className={styles.iconArrow} src={IconArrow} />
      </div>
      <Collapse collapsed={!opened}>
        <div className={styles.wrapperOptions} style={{ height: heightWrapper }}>
          <Scroller className={styles.scroll} invisible={isMobile}>
            <div className={styles.options} ref={refOptions}>
              {items.map((item) => {
                const selected = checked.some((option) => option.id === item.id);
                const option = renderItem({ ...item, selected });

                return cloneElement(option, {
                  ...option.props,
                  key: item.id,
                  onClick: (e: MouseEvent) => onClickItem(e, item),
                });
              })}
            </div>
          </Scroller>
        </div>
      </Collapse>
    </div>
  );
};

export default memo(Popup);
