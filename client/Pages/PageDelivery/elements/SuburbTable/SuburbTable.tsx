import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './SuburbTable.module.css';

export interface SuburbTableProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SuburbTable: FC<SuburbTableProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.suburb, className)}>
      <div className={styles.title}>За пределы МКАД до центра населенного пункта:</div>
      <div className={styles.table}>
        <div className={styles.tr}>
          <div className={styles.td}>1 - 39 км от МКАД</div>
          <div className={styles.td}>30 ₽/км</div>
        </div>
        <div className={styles.tr}>
          <div className={styles.td}>40 - 59 км от МКАД</div>
          <div className={styles.td}>40 ₽/км</div>
        </div>
        <div className={styles.tr}>
          <div className={styles.td}>&gt; 60 км от МКАД</div>
          <div className={styles.td}>50 ₽/км</div>
        </div>
      </div>
    </div>
  );
};

export default memo(SuburbTable);
