import { FC, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Button from '@UI/Button';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import RelatedProductCard from '@Components/RelatedProductCard';
import { useRelatedProducts } from '@Stores/RelatedProducts';
import { ProductData } from '@Types/Product';
import styles from './RelatedProductsModal.module.css';

const RelatedProductsModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, onClose, ...restProps } = props;
  const { listId } = modal.data;
  const relatedProducts = useRelatedProducts();
  const list = relatedProducts.allLists.find((l) => l.id === listId);

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.modal, className)}
      title={list.title}
      view='default'
      modal={modal}
      onClose={onClose}
    >
      <List
        className={styles.list}
        items={list.products}
        renderChild={(product: ProductData) => (
          <RelatedProductCard className={styles.product} listId={list.id} product={product} />
        )}
      />

      <Button className={styles.buttonAccept} wide theme='blank' onClick={onClose}>
        Готово
      </Button>
    </ModalSidebar>
  );
};

export default memo(RelatedProductsModal);
