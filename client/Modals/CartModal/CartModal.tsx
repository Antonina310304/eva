import { FC, memo, useCallback, useEffect, useState } from 'react';

import CartStore, { useCart } from '@Stores/Cart';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import declOfNum from '@Utils/declOfNum';
import Price from '@UI/Price';
import Button from '@UI/Button';
import Link from '@UI/Link';
import logger from '@Utils/logger';
import MainProductCard from './elems/MainProductCard';
import RelatedProductsSection from './elems/RelatedProductsSection';
import styles from './CartModal.module.css';

const titles = ['товар', 'товара', 'товаров'];
const CartModal: FC<ModalSidebarProps> = (props) => {
  const { modal, onClose, ...restProps } = props;
  const [loading, setLoading] = useState(true);
  const cart = useCart({ ssr: false });
  const titleCount = declOfNum(cart.count, titles);

  // Закрываем модальное окно в случае ошибки, чтобы пользователь мог повторить попытку
  const handleError = useCallback(
    (err: unknown) => {
      if (onClose) onClose(null);
      logger(err);
    },
    [onClose],
  );

  const handleOpen = useCallback(async () => {
    const productIds = modal.data.products.map((product: any) => product.shopProductId);

    try {
      await Promise.all([
        CartStore.addProducts(modal.data.products),
        CartStore.loadRelatedProducts({ productIds }),
      ]);

      setLoading(false);
    } catch (err) {
      handleError(err);
    }
  }, [handleError, modal.data.products]);

  useEffect(() => {
    if (!modal.visible) return;

    handleOpen();
  }, [handleOpen, modal.visible]);

  return (
    <ModalSidebar
      {...restProps}
      title='Товар в корзине'
      modal={modal}
      loading={loading}
      className={styles.wrapper}
      cnWrapperContent={styles.wrapperContent}
      cnHead={styles.head}
    >
      {!loading && (
        <>
          <div className={styles.mainContent}>
            <div className={styles.newProducts}>
              {cart.newPositions.map((position) => {
                return position.products.map((product) => (
                  <MainProductCard
                    className={styles.newProduct}
                    product={product}
                    position={position}
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

            <Link to='/order/check'>
              <Button wide className={styles.orderButton}>
                Оформить заказ
              </Button>
            </Link>
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
