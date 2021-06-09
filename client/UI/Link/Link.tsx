import React, { FC, AnchorHTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Link.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const Link: FC<LinkProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <a {...restProps} className={cn(styles.link, className)}>
      {children}
    </a>
  );
};

export default memo(Link);
