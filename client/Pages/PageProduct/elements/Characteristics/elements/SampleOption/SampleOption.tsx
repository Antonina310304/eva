import React, { FC, HTMLAttributes, useCallback, memo, useRef, useMemo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Price from '@UI/Price';
import Link from '@UI/Link';
import styles from './SampleOption.module.css';

import checkIcon from './check.svg';

export type SelectCallback = (e: MouseEvent, item: SampleOptionProps) => void;

export interface SampleOptionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: string;
  image: string;
  name: string;
  active: boolean;
  price?: number;
  href?: string;
  onClickOption?: SelectCallback;
  onCheck?: SelectCallback;
  onUncheck?: SelectCallback;
}

const SampleOption: FC<SampleOptionProps> = (props) => {
  const {
    className,
    image,
    name,
    price,
    active,
    id,
    href,
    onClickOption,
    onCheck,
    onUncheck,
    ...restProps
  } = props;
  const item = useRef({ image, name, price, id, active, href });

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!item.current) return;

      if (onClickOption) onClickOption(e, item.current);
      if (onCheck && !active) onCheck(e, item.current);
      if (onUncheck && active) onUncheck(e, item.current);
    },
    [active, item, onCheck, onClickOption, onUncheck],
  );

  const content = useMemo(() => {
    return (
      <>
        {image && (
          <div className={styles.border}>
            <Image className={styles.sample} src={image} />
          </div>
        )}
        <div className={styles.name}>{name}</div>
        {price && <Price price={price} className={styles.price} />}
        <Image src={checkIcon} className={cn(styles.checkIcon, { [styles.active]: active })} />
      </>
    );
  }, [active, image, name, price]);

  return (
    <div
      {...restProps}
      className={cn(styles.option, { [styles.active]: active }, className)}
      onClick={handleClick}
    >
      {href ? (
        <Link className={styles.container} to={href} view='simple'>
          {content}
        </Link>
      ) : (
        <div className={styles.container}>{content}</div>
      )}
    </div>
  );
};

export default memo(SampleOption);
