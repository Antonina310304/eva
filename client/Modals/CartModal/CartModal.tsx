import React, { FC, memo, useCallback, useEffect } from 'react';

import CartStore, { useCart } from '@Stores/Cart';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import declOfNum from '@Utils/declOfNum';
import Price from '@UI/Price';
import Button from '@UI/Button';
import MainProductCard from './elems/MainProductCard';
import styles from './CartModal.module.css';

const titles = ['товар', 'товара', 'товаров'];
const CartModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const cart = useCart();
  const titleCount = declOfNum(cart.count, titles);

  const handleAddProduct = useCallback(() => {
    CartStore.addProduct(modal.data.products);
  }, [modal.data.products]);

  useEffect(() => {
    if (!modal.visible) return;

    handleAddProduct();
  }, [handleAddProduct, modal.visible]);

  return (
    <ModalSidebar
      {...restProps}
      title='Товар в корзине'
      modal={modal}
      loading={cart.network === 'loading'}
      cnWrapperContent={styles.wrapperContent}
    >
      {cart.network === 'success' && (
        <>
          <div className={styles.newProducts}>
            {cart.newPositions.map((position) => {
              return position.products.map((product) => (
                <MainProductCard className={styles.newProduct} product={product} key={product.id} />
              ));
            })}
          </div>

          <div className={styles.sectionTotal}>
            <div className={styles.textInfo}>
              После оформления заказа менеджер свяжется с вами, чтобы уточнить все детали
            </div>

            <div className={styles.wrapperTotal}>
              <div className={styles.totalCount}>
                {`Итого ${cart.count} ${titleCount} на сумму`}
              </div>
              <Price className={styles.totalPrice} price={cart.cost} />
            </div>
          </div>

          <Button wide className={styles.orderButton}>
            Оформить заказ
          </Button>
        </>
      )}
    </ModalSidebar>
  );
};

export default memo(CartModal);
