import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './Anchors.module.css';

export interface AnchorsItem {
  name: string;
  href: string;
  active?: boolean;
}

export interface AnchorsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  anchors: AnchorsItem[];
}

const Anchors: FC<AnchorsProps> = (props) => {
  const { className, anchors, ...restProps } = props;

  return (
    <nav {...restProps} className={cn(styles.wrapper, className)}>
      {anchors.map((item, index) => (
        <div className={styles.anchorsItem} key={index}>
          <Link
            to={item.href}
            className={cn(styles.link, { [styles.active]: item.active })}
            view='simple'
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default memo(Anchors);
