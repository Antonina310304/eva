import React, { FC, memo, useCallback, useMemo, MouseEvent } from 'react';
import cn from 'classnames';
import { LinkProps as BaseLinkProps, useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { ApiPages } from '@Api/Pages';
import useMeta from '@Queries/useMeta';
import useModals from '@Hooks/useModals';
import styles from './Link.module.css';

export interface LinkProps extends BaseLinkProps {
  className?: string;
  view?: 'primary' | 'secondary' | 'native';
  asButton?: boolean;
  needFetch?: boolean;
  preventDefault?: boolean;
  to: string;
  onClick?(e: MouseEvent): void;
}

const Link: FC<LinkProps> = (props) => {
  const {
    className,
    to,
    view,
    needFetch = true,
    preventDefault,
    children,
    target,
    asButton,
    onClick,
    ...restProps
  } = props;
  const queryClient = useQueryClient();
  const history = useHistory();
  const meta = useMeta({ ssr: true });
  const [, { closeAllModals }] = useModals();

  // Добавляем регион, если ссылка его не содержит
  const href = useMemo(() => {
    const regionUrl = meta.data ? meta.data.region.url : null;
    const needAddRegion = regionUrl && !to.startsWith(`${regionUrl}/`);

    return needAddRegion ? `${regionUrl}${to}` : to;
  }, [meta.data, to]);

  const handleClick = useCallback(
    async (e: MouseEvent) => {
      if (window.cancelClick) {
        e.preventDefault();
        return;
      }

      if (onClick) onClick(e);

      if (preventDefault) {
        e.preventDefault();
        return;
      }
      if (target === '_blank') return;

      e.preventDefault();

      if (href.substr(0, 1) === '#') {
        history.push(href);
        return;
      }

      if (needFetch) {
        await queryClient.prefetchQuery(['page', 'ssr', href], () =>
          ApiPages.fetchPage({ path: href }),
        );
        closeAllModals();
        history.push(href);
        window.scrollTo({ top: 0 });
      }
    },
    [closeAllModals, history, href, needFetch, onClick, preventDefault, queryClient, target],
  );

  if (!meta.isSuccess) return null;

  return (
    <a
      {...restProps}
      href={href}
      target={target}
      className={cn(
        styles.link,
        {
          [styles.primary]: view === 'primary',
          [styles.secondary]: view === 'secondary',
          [styles.native]: view === 'native',
          [styles.asButton]: asButton,
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
