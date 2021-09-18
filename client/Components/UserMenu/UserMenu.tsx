import { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import UserElemMenu from '@UI/UserElemMenu';
import { useCart } from '@Stores/Cart';
import useModals from '@Hooks/useModals';
import styles from './UserMenu.module.css';

export interface UserMenuProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const UserMenu: FC<UserMenuProp> = ({ className }) => {
  const cart = useCart();
  const [, { openModal }] = useModals();

  const handleClickUser = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  const handleClickFavorites = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  const items = [
    {
      title: 'Личный кабинет',
      icon: 'user',
      onClick: handleClickUser,
    },
    {
      title: 'Избранное',
      icon: 'favorites',
      onClick: handleClickFavorites,
    },
    {
      title: 'Корзина',
      icon: 'basket',
      link: '/order/check',
      count: cart?.count,
    },
  ];

  return (
    <ul className={cn(styles.list, className)}>
      {items.map((item) => (
        <li className={styles.userMenuItem} key={item.icon} onClick={item.onClick}>
          <UserElemMenu element={item} />
        </li>
      ))}
    </ul>
  );
};

export default memo(UserMenu);
