import React, { memo, FC, useState, useEffect, useCallback, useMemo } from 'react';

import { ApiOrder, GetDeliveryInfoResult } from '@Api/Order';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import useModals from '@Hooks/useModals';
import logger from '@Utils/logger';
import Payments from './elems/Payments';
import styles from './DeliveryInfoModal.module.css';

const DeliveryInfoModal: FC<ModalSidebarProps> = (props) => {
  const { modal, onClose, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<GetDeliveryInfoResult>(null);

  const tables = useMemo(() => {
    if (loading || !response) return [];

    return (
      Object.values(response.table)
        // Как правило так обозначают пустую страницу, отображать её не нужно
        .map((table) => table.replace('\n', ''))
        .filter(Boolean)
    );
  }, [loading, response]);

  const handleError = useCallback(
    (err: unknown) => {
      logger(err);

      openModal('Info', {
        title: 'Упс, ошибка!',
        text: 'Произошла ошибка во время загрузки. Пожалуйста, попробуйте позже',
        view: 'error',
      });
    },
    [openModal],
  );

  useEffect(() => {
    async function load() {
      const res = await ApiOrder.getDeliveryInfo();

      setResponse(res);
    }

    try {
      load();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError, onClose]);

  return (
    <ModalSidebar
      {...restProps}
      cnWrapperContent={styles.wrapper}
      modal={modal}
      title='Доставка и оплата'
      loading={loading}
      onClose={onClose}
    >
      <div className={styles.container}>
        {!loading && response && (
          <>
            {response.teaser && <div className={styles.teaser}>{response.teaser}</div>}

            {response.table && (
              <div className={styles.tables}>
                {tables.map((table, index) => (
                  <div
                    className={styles.table}
                    key={index}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: table }}
                  />
                ))}
              </div>
            )}

            {response.paymentTypes?.length > 0 && (
              <div className={styles.containerPayments}>
                <div className={styles.paymentTitle}>Оплата</div>

                <Payments paymentTypes={response.paymentTypes} />
              </div>
            )}
          </>
        )}
      </div>
    </ModalSidebar>
  );
};

export default memo(DeliveryInfoModal);
