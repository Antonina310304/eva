import React, { FC, memo, useCallback, useEffect } from 'react';

import CartStore, { useCart } from '@Stores/Cart';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import declOfNum from '@Utils/declOfNum';
import Price from '@UI/Price';
import Button from '@UI/Button';
import MainProductCard from './elems/MainProductCard';
import RelatedProductsSection from './elems/RelatedProductsSection';
import styles from './CartModal.module.css';

const titles = ['товар', 'товара', 'товаров'];
const CartModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const cart = useCart();
  const titleCount = declOfNum(cart.count, titles);

  const handleOpen = useCallback(() => {
    const productIds = modal.data.products.map((product: any) => product.shopProductId);

    CartStore.addProduct(modal.data.products);
    CartStore.loadRelatedProducts({ productIds });
  }, [modal.data.products]);

  useEffect(() => {
    if (!modal.visible) return;

    handleOpen();
  }, [handleOpen, modal.visible]);

  return (
    <ModalSidebar
      {...restProps}
      title='Товар в корзине'
      modal={modal}
      loading={cart.network === 'loading'}
      className={styles.wrapper}
      cnWrapperContent={styles.wrapperContent}
      cnHead={styles.head}
    >
      {cart.network === 'success' && (
        <>
          <div className={styles.mainContent}>
            <div className={styles.newProducts}>
              {cart.newPositions.map((position) => {
                return position.products.map((product) => (
                  <MainProductCard
                    className={styles.newProduct}
                    product={product}
                    key={product.id}
                  />
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
          </div>

          {cart.relatedProducts?.length > 0 && (
            <RelatedProductsSection
              className={styles.sectionRelated}
              title={cart.relatedTitle}
              relatedProducts={cart.relatedProducts}
            />
          )}
        </>
      )}
    </ModalSidebar>
  );
};

export default memo(CartModal);
