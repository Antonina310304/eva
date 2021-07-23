import React, { FC, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';
import { LinkProps as BaseLinkProps, useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { ApiPages } from '@Api/Pages';
import styles from './Link.module.css';

export interface LinkProps extends BaseLinkProps {
  className?: string;
  view?: 'primary' | 'secondary' | 'simple' | 'native';
  needFetch?: boolean;
  size?: 's';
  to: string;
  onClick?(e: MouseEvent): void;
}

const Link: FC<LinkProps> = (props) => {
  const {
    className,
    to,
    view = 'primary',
    needFetch = true,
    children,
    size = 'n',
    onClick,
    ...restProps
  } = props;
  const queryClient = useQueryClient();
  const history = useHistory();

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      if (window.cancelClick) return;
      if (needFetch) {
        await queryClient.prefetchQuery(['page', to, 'ssr'], () =>
          ApiPages.fetchPage({ path: to }),
        );
        history.push(to);
        window.scrollTo({ top: 0 });
      }
      if (onClick) onClick(e);
    },
    [history, needFetch, onClick, queryClient, to],
  );

  return (
    <a
      {...restProps}
      href={to}
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
    </a>
  );
};

export default memo(Link);
