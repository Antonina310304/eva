import React, { FC, memo } from 'react';
import cn from 'classnames';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';

import styles from './CartModal.module.css';

const CartModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.wrapper, className)}
      title='Товар в корзине'
      modal={modal}
    >
      Content
    </ModalSidebar>
  );
};

export default memo(CartModal);
