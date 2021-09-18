import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './PromoPlaceholder.module.css';

export interface PromoPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PromoPlaceholder: FC<PromoPlaceholderProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.promoPlaceholder, className)}>
      <div className={styles.content}>
        <div className={styles.title}>
          Хотите здесь
          <br />
          увидеть свое фото?
        </div>
        <div className={styles.text}>
          {`Отмечайте `}
          <Link view='native' to='/'>
            @official_divan.ru
          </Link>
          <br />
          {` в своих публикациях`}
        </div>
      </div>
    </div>
  );
};

export default memo(PromoPlaceholder);
