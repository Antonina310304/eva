import { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './CurrencySymbol.module.css';

export interface CurrencySymbolProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  currency?: 'RUB' | 'BYN';
}

const CurrencySymbol: FC<CurrencySymbolProps> = (props) => {
  const { className, currency = 'RUB', ...restProps } = props;

  return (
    <span
      {...restProps}
      className={cn(
        styles.symbol,
        {
          [styles.rub]: currency === 'RUB',
          [styles.bun]: currency === 'BYN',
        },
        className,
      )}
    >
      руб.
    </span>
  );
};

CurrencySymbol.defaultProps = {
  currency: 'RUB',
};

export default memo(CurrencySymbol);
