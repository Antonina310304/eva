import React, { FC, memo, useCallback, useEffect } from 'react';
import cn from 'classnames';

import CartStore, { useCart } from '@Stores/Cart';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import MainProductCard from './elems/MainProductCard';
import styles from './CartModal.module.css';

const CartModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const cart = useCart();

  const handleAddProduct = useCallback(() => {
    CartStore.addProduct(modal.data.products);
  }, [modal.data.products]);

  useEffect(() => {
    if (!modal.visible) return;

    handleAddProduct();
  }, [handleAddProduct, modal.visible]);

  console.log(cart);

  return (
    <ModalSidebar
      {...restProps}
      title='Товар в корзине'
      modal={modal}
      loading={cart.network === 'loading'}
      cnWrapperContent={styles.wrapperContent}
    >
      {cart.network === 'success' && (
        <div className={styles.newProducts}>
          {cart.newPositions.map((position) => {
            return position.products.map((product) => (
              <MainProductCard className={styles.newProduct} product={product} />
            ));
          })}
        </div>
      )}
    </ModalSidebar>
  );
};

export default memo(CartModal);
