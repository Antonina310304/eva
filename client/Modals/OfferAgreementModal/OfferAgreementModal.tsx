import { memo, FC, useState, useEffect, useCallback } from 'react';

import * as ApiOrder from '@Api/Order';
import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import useModals from '@Hooks/useModals';
import logger from '@Utils/logger';
import styles from './OfferAgreementModal.module.css';

function createDivWithContent(content: string): HTMLDivElement {
  const div = document.createElement('div');

  div.innerHTML = content;

  return div;
}

const OfferAgreementModal: FC<ModalSidebarProps> = (props) => {
  const { modal, onClose, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  const handleError = useCallback(
    (err: unknown) => {
      logger(err);

      openModal('Info', {
        title: 'Упс, ошибка!',
        text: 'Произошла ошибка во время загрузки договора оферты. Пожалуйста, попробуйте позже',
        view: 'error',
      });
    },
    [openModal],
  );

  useEffect(() => {
    async function load() {
      const response = await ApiOrder.getOfertaInfo();
      const div = createDivWithContent(response);
      const h1 = div.querySelector('.h1style')?.textContent || '';

      setTitle(h1);
      setContent(response);
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
      title={title}
      loading={loading}
      onClose={onClose}
    >
      <div className={styles.container}>
        {!loading && (
          <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
          </>
        )}
      </div>
    </ModalSidebar>
  );
};

export default memo(OfferAgreementModal);
