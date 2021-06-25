import React, { FC, memo } from 'react';
import cn from 'classnames';
import { Link as BaseLink, LinkProps as BaseLinkProps } from 'react-router-dom';

import styles from './Link.module.css';

export interface LinkProps extends BaseLinkProps {
  className?: string;
  view?: 'primary' | 'secondary' | 'simple';
}

const Link: FC<LinkProps> = (props) => {
  const { className, view = 'primary', children, ...restProps } = props;

  return (
    <BaseLink
      {...restProps}
      className={cn(
        styles.link,
        {
          [styles.primary]: view === 'primary',
          [styles.secondary]: view === 'secondary',
          [styles.simple]: view === 'simple',
        },
        className,
      )}
    >
      {children}
    </BaseLink>
  );
};

export default memo(Link);
