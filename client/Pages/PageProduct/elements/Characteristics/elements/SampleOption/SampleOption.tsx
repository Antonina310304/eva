import React, { FC, HTMLAttributes, useCallback, memo, useRef, useMemo, MouseEvent } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Price from '@UI/Price';
import Link from '@UI/Link';
import { SelectItemData } from '@UI/Select';
import styles from './SampleOption.module.css';
import checkIcon from './check.svg';

export interface SampleOptionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  item: SelectItemData;
  onClick?: (e: MouseEvent) => void;
}

const SampleOption: FC<SampleOptionProps> = (props) => {
  const { className, item, onClick, ...restProps } = props;

  const content = useMemo(() => {
    return (
      <>
        <div className={styles.left}>
          {item.image && <Image className={styles.sample} src={item.image} />}
          <div className={styles.name}>{item.name}</div>
        </div>

        <div className={styles.right}>
          {item.price && <Price price={item.price} className={styles.price} />}
          <Image
            src={checkIcon}
            className={cn(styles.checkIcon, { [styles.selected]: item.selected })}
          />
        </div>
      </>
    );
  }, [item]);

  return (
    <div
      {...restProps}
      className={cn(styles.option, { [styles.selected]: item.selected }, className)}
      onClick={onClick}
    >
      {item.href ? (
        <Link className={styles.container} to={item.href} view='simple'>
          {content}
        </Link>
      ) : (
        <div className={styles.container}>{content}</div>
      )}
    </div>
  );
};

export default memo(SampleOption);
