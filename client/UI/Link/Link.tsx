import React, { FC, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';
import { Link as BaseLink, LinkProps as BaseLinkProps, useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { ApiPages } from '@Api/Pages';
import styles from './Link.module.css';

export interface LinkProps extends BaseLinkProps {
  className?: string;
  view?: 'primary' | 'secondary' | 'simple' | 'native';
  size?: 's';
  to: string;
}

const Link: FC<LinkProps> = (props) => {
  const { className, to, view = 'primary', children, size = 'n', ...restProps } = props;
  const queryClient = useQueryClient();
  const history = useHistory();

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      if (window.cancelClick) return;

      await queryClient.prefetchQuery(['page', to, 'ssr'], () => ApiPages.fetchPage({ path: to }));
      history.push(to);
      window.scrollTo({ top: 0 });
    },
    [history, queryClient, to],
  );

  return (
    <BaseLink
      {...restProps}
      to={to}
      className={cn(
        styles.link,
        {
          [styles.primary]: view === 'primary',
          [styles.secondary]: view === 'secondary',
          [styles.simple]: view === 'simple',
          [styles.native]: view === 'native',
          [styles.sizeS]: size === 's',
          [styles.sizeN]: size === 'n',
        },
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </BaseLink>
  );
};

export default memo(Link);
