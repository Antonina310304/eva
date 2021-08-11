import React, { FC, HTMLAttributes, MouseEvent, memo, useMemo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Link from '@UI/Link';
import { useFiltrator } from '@Stores/Filtrator';
import declOfNum from '@Utils/declOfNum';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  waiting?: boolean;
  onApply?: (e: MouseEvent) => void;
}

const Footer: FC<FooterProps> = (props) => {
  const { className, waiting, onApply, ...restProps } = props;
  const filtrator = useFiltrator();

  const totalCountText = useMemo(() => {
    const { totalCount } = filtrator;
    const titles = ['товар', 'товара', 'товаров'];

    if (typeof totalCount !== 'number') return null;

    return `(${totalCount} ${declOfNum(totalCount, titles)})`;
  }, [filtrator]);

  return (
    <div {...restProps} className={cn(styles.footer, className)}>
      <Button className={styles.buttonApply} wide waiting={waiting} onClick={onApply}>
        <span className={styles.textApply}>Применить</span>
        {totalCountText && <span className={styles.textTotalCount}>{totalCountText}</span>}
      </Button>
      <div className={styles.footerAdditional}>
        <Link className={styles.reset} to='#' view='secondary'>
          Сбросить фильтр
        </Link>
      </div>
    </div>
  );
};

export default memo(Footer);
