import React, { useCallback, memo, FC, MouseEvent, ReactChild, useMemo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import useMedias from '@Hooks/useMedias';
import Item from './elems/Item';
import styles from './Paginator.module.css';

export interface GenerateUrlParams {
  page?: number;
}

export type GenerateUrl = (params: GenerateUrlParams) => string;

export interface PaginatorItem {
  page: number;
  link?: string;
  disabled?: boolean;
  content?: ReactChild;
}

export interface PaginatorProps {
  className?: string;
  now: number;
  total?: number;
  defaultCountVisible?: number;
  generateUrl?: GenerateUrl;
  onChange?(e: MouseEvent, item: PaginatorItem): void;
}

const generateUrlDefault: GenerateUrl = ({ page }) => {
  return `?page=${page}`;
};

const Paginator: FC<PaginatorProps> = (props) => {
  const {
    className,
    now,
    total,
    defaultCountVisible = 3,
    generateUrl,
    onChange,
    ...restProps
  } = props;
  const { isMobile } = useMedias();
  const countVisible = isMobile ? 1 : defaultCountVisible;

  const items: PaginatorItem[] = useMemo(() => {
    const generatorUrl = generateUrl || generateUrlDefault;
    const prevPage = now - 1;
    const nextPage = now + 1;
    const result = [];

    for (let i = 0; i < total; i += 1) {
      const page = i + 1;
      let needToAdd = true;

      if (i < now - 1 - countVisible) needToAdd = false;
      if (i > now - 1 + countVisible) needToAdd = false;
      if (i === 0 || i === total - 1) needToAdd = true;

      if (needToAdd) {
        result.push({
          page,
          link: generatorUrl({ page }),
        });
      }
    }

    // Добавляем стрелочку назад
    result.unshift({
      page: prevPage,
      link: generatorUrl({ page: prevPage }),
      disabled: now <= 1,
      content: <div className={cn(styles.arrow, styles.left)} />,
    });

    // Добавляем стрелочку вперед
    result.push({
      page: nextPage,
      link: generatorUrl({ page: nextPage }),
      disabled: now >= total,
      content: <div className={cn(styles.arrow, styles.right)} />,
    });

    // Добавляем многоточие в начале
    if (now - 1 - countVisible > 1) {
      result.splice(2, 0, {
        page: prevPage,
        disabled: true,
        content: <div className={styles.ellipsis}>…</div>,
      });
    }

    // Добавляем многоточие в конце
    if (now + 1 + countVisible < total) {
      result.splice(result.length - 2, 0, {
        page: prevPage,
        disabled: true,
        content: <div className={styles.ellipsis}>…</div>,
      });
    }

    return result;
  }, [countVisible, generateUrl, now, total]);

  const handleClickItem = useCallback(
    (e: MouseEvent, item: PaginatorItem) => {
      if (!onChange) return;
      if (item.disabled) return;

      onChange(e, item);
    },
    [onChange],
  );

  return (
    <List
      {...restProps}
      className={cn(styles.paginator, className)}
      items={items}
      renderChild={(item: PaginatorItem) => (
        <Item
          className={styles.item}
          link={item.link}
          actived={now === item.page}
          disabled={item.disabled}
          onClick={(e) => handleClickItem(e, item)}
        >
          {item.content || item.page}
        </Item>
      )}
    />
  );
};

export default memo(Paginator);
