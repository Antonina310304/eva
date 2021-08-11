import React, { memo, FC, HTMLAttributes, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import { CheckboxItemData } from '../../typings';
import styles from './Row.module.css';

export interface CheckboxRowProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  item: CheckboxItemData;
  onToggle?: (e: MouseEvent, item: CheckboxItemData) => void;
}

const CheckboxRow: FC<CheckboxRowProps> = (props) => {
  const { className, item, onToggle, ...restProps } = props;
  const isWhite = ['#ffffff', '#fff', 'white'].includes(item.color?.toLowerCase());
  const [checked, setChecked] = useState(item.checked);

  const handleClick = useCallback(
    (e) => {
      setChecked((prev) => !prev);

      if (onToggle) onToggle(e, item);
    },
    [item, onToggle],
  );

  useEffect(() => {
    setChecked(item.checked);
  }, [item.checked]);

  return (
    <div
      {...restProps}
      className={cn(styles.row, { [styles.colored]: !!item.color }, className)}
      onClick={handleClick}
    >
      <input readOnly className={styles.control} type='checkbox' checked={checked} />

      <div className={styles.container}>
        <div
          className={cn(styles.box, { [styles.isWhite]: isWhite })}
          style={item.color ? { backgroundColor: item.color } : undefined}
        >
          <div className={styles.check} />
        </div>

        <span className={styles.text}>{item.text}</span>
      </div>
    </div>
  );
};

export default memo(CheckboxRow);
