import { FC, HTMLAttributes, MouseEvent, memo, useMemo, useCallback, useState } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Link from '@UI/Link';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import declOfNum from '@Utils/declOfNum';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onApply?: unknown;
}

const Footer: FC<FooterProps> = (props) => {
  const { className, onApply, ...restProps } = props;
  const filtrator = useFiltrator();
  const [waiting, setWaiting] = useState(false);

  const totalCountText = useMemo(() => {
    const { totalCount } = filtrator;
    const titles = ['товар', 'товара', 'товаров'];

    if (typeof totalCount !== 'number') return null;

    return `(${totalCount} ${declOfNum(totalCount, titles)})`;
  }, [filtrator]);

  const handleApply = useCallback(
    async (e) => {
      if (typeof onApply !== 'function') return;

      setWaiting(true);
      await onApply(e);
      setWaiting(false);
    },
    [onApply],
  );

  const handleReset = useCallback((e: MouseEvent) => {
    e.preventDefault();
    Filtrator.resetAll();
  }, []);

  return (
    <div {...restProps} className={cn(styles.footer, className)}>
      <Button className={styles.buttonApply} wide waiting={waiting} onClick={handleApply}>
        <span className={styles.textApply}>Применить</span>
        {totalCountText && <span className={styles.textTotalCount}>{totalCountText}</span>}
      </Button>
      <div className={styles.footerAdditional}>
        <Link
          className={styles.reset}
          to='#'
          view='secondary'
          needFetch={false}
          onClick={handleReset}
        >
          Сбросить фильтр
        </Link>
      </div>
    </div>
  );
};

export default memo(Footer);
