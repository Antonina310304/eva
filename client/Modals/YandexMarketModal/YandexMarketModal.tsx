import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Image from '@UI/Image';
import Button from '@UI/Button';
import fakeData from './fakeData.json';
import styles from './YandexMarketModal.module.css';

export interface YandexMarketModalProps {
  className?: string;
}

const YandexMarketModal: FC<YandexMarketModalProps> = (props) => {
  const { className } = props;
  const id = 'YandexMarket';
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <Modal className={cn(styles.modal, [className])} id={id} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>{fakeData.heading}</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.description}>{fakeData.description}</div>
        <Image className={styles.logo} src={fakeData.image} />
        <Button className={styles.button}>{fakeData.button}</Button>
      </div>
    </Modal>
  );
};

export default memo(YandexMarketModal);
