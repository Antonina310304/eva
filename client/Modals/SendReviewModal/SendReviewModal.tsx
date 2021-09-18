import { useCallback, memo, FC } from 'react';
import cn from 'classnames';
import { useQueryClient } from 'react-query';

import IconClose from '@UI/IconClose';
import ModalMain from '@Components/ModalMain';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';
import SendReviewForm from '@Forms/SendReviewForm';
import { ProductData } from '@Types/Product';
import styles from './SendReviewModal.module.css';

export interface ModalData extends IModal {
  data: {
    product: ProductData;
  };
}
export interface SendReviewModalProps {
  className?: string;
  modal: ModalData;
}

const SendReviewModal: FC<SendReviewModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { product } = modal.data;
  const queryClient = useQueryClient();
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries('page');
  }, [queryClient]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, [className])}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.wrapperTitle}>
          <div className={styles.title}>Мой отзыв</div>
          <IconClose onClick={handleClose} />
        </div>
        <div className={styles.productName}>{`${product.type} ${product.name}`}</div>

        <div className={styles.form}>
          <SendReviewForm product={product} onCancel={handleClose} onSuccess={handleSuccess} />
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(SendReviewModal);
