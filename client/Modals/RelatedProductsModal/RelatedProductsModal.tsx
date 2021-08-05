import React, { FC, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import RelatedProductCard from '@Components/RelatedProductCard';
import { useRelatedProducts } from '@Stores/relatedProducts';
import { ProductData } from '@Types/Product';
import styles from './RelatedProductsModal.module.css';

const RelatedProductsModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
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
    >
      <List
        className={styles.list}
        items={list.products}
        renderChild={(product: ProductData) => (
          <RelatedProductCard className={styles.product} listId={list.id} product={product} />
        )}
      />
    </ModalSidebar>
  );
};

export default memo(RelatedProductsModal);
