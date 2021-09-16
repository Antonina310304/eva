import React, { FC, HTMLAttributes, useState, memo, useCallback } from 'react';
import cn from 'classnames';

import PhoneNumber from '@UI/PhoneNumber';
import useMeta from '@Queries/useMeta';
import styles from './Phone.module.css';

export interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Phone: FC<PhoneProps> = (props) => {
  const { className, ...restProps } = props;
  const [opened, setOpened] = useState(false);
  const meta = useMeta();

  const handleClick = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  if (!meta.isSuccess) return null;

  return (
    <div
      {...restProps}
      className={cn(
        styles.phone,
        {
          [styles.opened]: opened,
        },
        className,
      )}
      onClick={handleClick}
    >
      <PhoneNumber className={styles.number} phone={meta.data.phones[0]} />
      <span className={styles.arrow} />
    </div>
  );
};

export default memo(Phone);
