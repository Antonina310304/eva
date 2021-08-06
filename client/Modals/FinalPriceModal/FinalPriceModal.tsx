import React, { FC, memo } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';

import styles from './FinalPriceModal.module.css';

const FinalPriceModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.wrapper, className)}
      title='Финальная цена'
      modal={modal}
      view='default'
    >
      <div className={styles.description}>
        Мы установили минимальную цену на этот товар, чтобы вы могли приобрести его выгодно.
      </div>
      <div className={styles.info}>
        Поэтому на эту продукцию не действуют другие специальные предложения и скидки по промокодам.
      </div>
    </ModalSidebar>
  );
};

export default memo(FinalPriceModal);
