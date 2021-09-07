import React, { FC, HTMLAttributes, memo, MouseEvent } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Price from '@UI/Price';
import Link from '@UI/Link';
import { SelectItemData } from '@UI/Select';
import styles from './SampleOption.module.css';
import checkIcon from './check.svg';

export interface ContainerProps {
  className?: string;
  item: SelectItemData;
}

export interface SampleOptionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  item: SelectItemData;
  onClick?: (e: MouseEvent) => void;
}

const Container: FC<ContainerProps> = (props) => {
  const { item, ...restProps } = props;

  return item.href ? (
    <Link {...restProps} className={styles.container} to={item.href} />
  ) : (
    <div {...restProps} className={styles.container} />
  );
};

const SampleOption: FC<SampleOptionProps> = (props) => {
  const { className, item, onClick, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(styles.option, { [styles.selected]: item.selected }, className)}
      onClick={onClick}
    >
      <Container item={item}>
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
      </Container>
    </div>
  );
};

export default memo(SampleOption);
