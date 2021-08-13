import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import { Warranty } from '@Pages/PageWarranty/typings';
import styles from './Garanties.module.css';

export interface GarantiesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  warranty: Warranty[];
}

const Garanties: FC<GarantiesProps> = (props) => {
  const { className, warranty, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.garanties, className)}>
      <div className={styles.title}>Гарантируем обмен или возврат</div>

      <div className={styles.container}>
        {warranty.map((item) => (
          <div className={styles.item} key={item.id}>
            <div className={styles.imageWrapper}>
              <Image src={item.src} className={styles.icon} />
            </div>
            <div className={styles.text}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Garanties);
