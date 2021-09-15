import React, { FC, HTMLAttributes, useCallback } from 'react';
import cn from 'classnames';

import UserElemMenu from '@UI/UserElemMenu';
import { useCart } from '@Stores/Cart';
import useModals from '@Hooks/useModals';
import styles from './BottomUserMenu.module.css';

export interface BottomMenuProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BottomUserMenu: FC<BottomMenuProps> = (props) => {
  const { className, ...restProps } = props;
  const cart = useCart();
  const [, { openModal }] = useModals();

  const handleClickPhone = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  const handleClickMessage = useCallback(() => {
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
      title: 'Позвонить',
      icon: 'phone',
      onClick: handleClickPhone,
    },
    {
      title: 'Написать',
      icon: 'message',
      onClick: handleClickMessage,
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
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <div className={styles.fixed}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.icon} onClick={item.onClick}>
              <UserElemMenu element={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BottomUserMenu;
