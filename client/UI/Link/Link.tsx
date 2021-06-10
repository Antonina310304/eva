import React, { FC, AnchorHTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  view?: 'primary' | 'secondary';
}

const Link: FC<LinkProps> = (props) => {
  const { className, view = 'primary', children, ...restProps } = props;

  return (
    <a
      {...restProps}
      className={cn(
        styles.link,
        {
          [styles.primary]: view === 'primary',
          [styles.secondary]: view === 'secondary',
        },
        className,
      )}
    >
      {children}
    </a>
  );
};

export default memo(Link);
