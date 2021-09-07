import React, { HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import useMeta from '@Queries/useMeta';
import styles from './Ruble.module.css';

export interface RubleProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const Ruble: FC<RubleProps> = (props) => {
  const { className, ...restProps } = props;
  const meta = useMeta();
  console.log('meta Ruble', meta);

  // const country = meta.country.toLowerCase();
  const country = 'RUS';

  return (
    <span
      {...restProps}
      className={cn(
        styles.ruble,
        {
          [styles.rus]: country === 'RUS',
          //  [styles.blr]: country === 'BLR'
        },
        className,
      )}
    />
  );
};

export default Ruble;
