import React, { memo, FC, AnchorHTMLAttributes } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './Item.module.css';

export interface ItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  link: string;
  actived?: boolean;
  disabled?: boolean;
}

const PaginationItem: FC<ItemProps> = (props) => {
  const { className, actived, disabled, link, children, ...restProps } = props;

  return (
    <Link
      {...restProps}
      className={cn(
        styles.item,
        { [styles.actived]: actived, [styles.disabled]: disabled },
        className,
      )}
      view='simple'
      to={link}
      needFetch={false}
    >
      {children}
    </Link>
  );
};

export default memo(PaginationItem);
