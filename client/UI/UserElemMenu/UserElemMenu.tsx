import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './UserElemMenu.module.css';

export interface Element {
  title: string;
  icon: string;
  link?: string;
  count?: number;
  isDisabled?: boolean;
}

export interface UserElemMenuProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  element: Element;
}

const UserElemMenu: FC<UserElemMenuProp> = ({ className, element }) => {
  const Tag = (props) => (element.link ? <Link {...props} /> : <p {...props} />);

  return (
    <Tag
      className={cn(className, styles.link, {
        [styles.user]: element.icon === 'user',
        [styles.favorites]: element.icon === 'favorites',
        [styles.basket]: element.icon === 'basket',
        [styles.phone]: element.icon === 'phone',
        [styles.message]: element.icon === 'message',
        [styles.full]: !!element.count,
        [styles.disabled]: element.isDisabled,
      })}
      to={element.link}
    >
      {element.title}
      {!!element.count && <span>{element.count}</span>}
    </Tag>
  );
};

export default memo(UserElemMenu);
