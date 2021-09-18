import { FC, memo, useCallback, useEffect } from 'react';
import cn from 'classnames';

import Like from '@Components/Like';
import IconClose from '@UI/IconClose';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import Image from '@UI/Image';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import { ProductData } from '@Types/Product';
import styles from './IdeaModal.module.css';

export interface IdeaModalData {
  product: ProductData;
}

export interface IdeaModal extends IModal {
  data: IdeaModalData;
}

export interface IdeaModalProps extends ModalMainProps {
  modal: IdeaModal;
}

const IdeaModal: FC<IdeaModalProps> = (props) => {
  const { className, modal, onClose, ...restProps } = props;
  const [, { openModal }] = useModals();
  const { isMobile } = useMedias();
  const { product } = modal.data;
  const [firstImage] = product.images;
  const hasExpired = product.price?.expired > 0;
  const hasDiscount = product.price?.discount > 0;

  const handleClickLike = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  // Принудительно закрываем модальное окно на десктопе,
  // потому что у него есть только мобильное оформление
  useEffect(() => {
    if (isMobile || !modal.visible) return;

    onClose(null);
  }, [isMobile, modal.visible, onClose]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <IconClose className={styles.iconClose} view='default' size='m' onClick={onClose} />
        </div>

        <div className={styles.content}>
          <div className={styles.imageBlock}>
            <Like className={styles.like} onClick={handleClickLike} />
            <Image className={styles.image} src={firstImage.src} />

            {product.tags?.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map((tag, index) => (
                  <img key={index} src={tag.image.src} className={styles.tag} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.title}>{product.name}</div>

          <div className={styles.prices}>
            <Price price={product?.price?.actual} className={styles.actualPrice} />
            {hasExpired && (
              <Price expired price={product.price.expired} className={styles.expiredPrice} />
            )}
            {hasDiscount && (
              <Discount className={styles.discount}>{product.price.discount}</Discount>
            )}
          </div>

          <div className={styles.details}>
            <Link to={product.link}>Подробнее</Link>
          </div>
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(IdeaModal);
