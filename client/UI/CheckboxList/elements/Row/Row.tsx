import React, { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { CheckboxItem } from '../../typings';
import styles from './Row.module.css';

export interface CheckboxRowProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  item: CheckboxItem;
}

const CheckboxRow: FC<CheckboxRowProps> = (props) => {
  const { className, item, ...restProps } = props;

  return (
    <label className={cn(styles.row, { [styles.colored]: !!item.color }, className)}>
      <input
        className={styles.control}
        type='checkbox'
        {...restProps}
        defaultChecked={item.defaultChecked}
      />

      <div className={styles.container}>
        <div className={styles.box} style={item.color && { backgroundColor: item.color }}>
          <div className={styles.check} />
        </div>

        <span className={styles.text}>{item.text}</span>
      </div>
    </label>
  );
};

export default memo(CheckboxRow);
