import React, { FC, memo, useCallback } from 'react';
import cn from 'classnames';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import styles from './DeliveryInformationModal.module.css';

const DeliveryInformationModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();

  const handleClickLink = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.modal, className)}
      title='Доставка'
      view='default'
      modal={modal}
    >
      <div className={styles.text}>
        Мы осуществляем доставку по Москве и Московской области. Также, в случае необходимости, вы
        можете забрать свой заказ в пункте самовывоза. При заказе мебели в регионы мы обеспечиваем
        доставку груза до терминала транспортной компании. Подробные условия всегда можно уточнить у
        наших менеджеров.
      </div>

      <div className={styles.nuance}>
        * при оформлении заказа в кредит без переплаты условия других акций на покупку не действуют.
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableTitle}>Доставка</div>
        <div className={styles.tableRow}>
          <div className={cn(styles.tableItem, styles.subtitle)}>
            В пределах МКАД
            <br />
            {`<10 км от МКАД`}
          </div>
          <div className={styles.tableItem}>1 290 ₽/км</div>
        </div>

        <div className={styles.tableTitle}>Подъем на этажи</div>
        <div className={styles.tableRow}>
          <div className={cn(styles.tableItem, styles.subtitle)}>На грузовом лифте</div>
          <div className={styles.tableItem}>500 ₽</div>
        </div>
        <div className={styles.tableRow}>
          <div className={cn(styles.tableItem, styles.subtitle)}>Ручной</div>
          <div className={styles.tableItem}>250 ₽ за этаж</div>
        </div>
        <div className={styles.tableRow}>
          <div className={cn(styles.tableItem, styles.subtitle)}>
            Подъем на 1 этаж (для клиентов, проживающих на первом этаже и в частных домах)
          </div>
          <div className={styles.tableItem}>500 ₽</div>
        </div>
      </div>

      <div className={styles.linkWrapper}>
        <Link className={styles.link} to='/site/delivery' onClick={handleClickLink}>
          Подробнее о доставке
        </Link>
      </div>
    </ModalSidebar>
  );
};

export default memo(DeliveryInformationModal);
