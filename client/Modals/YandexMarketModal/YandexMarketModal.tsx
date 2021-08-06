import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Image from '@UI/Image';
import Button from '@UI/Button';

import iconLogo from './yandex_market.svg';
import styles from './YandexMarketModal.module.css';

export interface YandexMarketModalProps {
  className?: string;
}

const YandexMarketModal: FC<YandexMarketModalProps> = (props) => {
  const { className } = props;
  const id = 'YandexMarket';
  const [, { closeModal }] = useModals();

  const handleClose = useCallback(() => {
    closeModal('YandexMarket');
  }, [closeModal]);

  return (
    <Modal className={cn(styles.modal, [className])} id={id} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>Ура, мы очень рады!</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.description}>
          Также можно поделиться отзывом на Яндекс.Маркет. Мы уже скопировали текст вашего отзыва,
          после перехода его можно будет просто вставить.
        </div>
        <Image className={styles.logo} src={iconLogo} />
        <Button className={styles.button}>Оставить отзыв</Button>
      </div>
    </Modal>
  );
};

export default memo(YandexMarketModal);
