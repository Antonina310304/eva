import React, { FC, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';
import { LinkProps as BaseLinkProps, useHistory } from 'react-router-dom';
import { useQueryClient, useIsFetching } from 'react-query';

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
    target,
    onClick,
    ...restProps
  } = props;
  const queryClient = useQueryClient();
  const isFetchingPages = useIsFetching(['page']);
  const history = useHistory();

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      if (target === '_blank') return;

      e.preventDefault();

      if (window.cancelClick) return;
      if (needFetch && isFetchingPages < 1) {
        await queryClient.prefetchQuery(['page', 'ssr', to], () =>
          ApiPages.fetchPage({ path: to }),
        );
        history.push(to);
        window.scrollTo({ top: 0 });
      }
      if (onClick) onClick(e);
    },
    [history, isFetchingPages, needFetch, onClick, queryClient, target, to],
  );

  return (
    <a
      {...restProps}
      href={to}
      target={target}
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
