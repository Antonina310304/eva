import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import { Modal as IModal } from '@Contexts/Modals';
import Modal from '@Components/Modal';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Image from '@UI/Image';
import Button from '@UI/Button';
import iconLogo from './yandex_market.svg';
import styles from './YandexMarketModal.module.css';

export interface ModalData extends IModal {
  data: {
    title: string;
    message: string[];
    cta: {
      text: string;
      link: string;
    };
  };
}

export interface YandexMarketModalProps {
  className?: string;
  modal: ModalData;
}

const YandexMarketModal: FC<YandexMarketModalProps> = (props) => {
  const { className, modal } = props;
  const { title, message, cta } = modal.data;
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <Modal className={cn(styles.modal, [className])} id={modal.id} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>{title}</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.description}>
          {message.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        <Image className={styles.logo} src={iconLogo} />
        <Button className={styles.button}>{cta.text}</Button>
      </div>
    </Modal>
  );
};

export default memo(YandexMarketModal);
