import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Link from '@UI/Link';
import Image from '@UI/Image';
import useMeta from '@Queries/useMeta';
import styles from './WriteToManagementModal.module.css';
import photo from './image.jpg';

const WriteToManagementModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeAllModals }] = useModals();
  const meta = useMeta();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.infoModal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <IconClose className={styles.iconClose} onClick={handleClose} />
        <Image src={photo} className={styles.image} />
        <div className={styles.content}>
          <div className={styles.title}>Написать руководству</div>
          <div className={styles.p}>
            Если у вас возникли вопросы или вы хотите связаться с руководством, напишите письмо на
            адрес
            {` `}
            <Link
              view='native'
              className={styles.link}
              to={`${meta.data.country === 'RUS' ? 'mailto:top@divan.ru' : 'mailto:love@divan.by'}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              {meta.data.country === 'RUS' ? 'top@divan.ru' : 'love@divan.by'}
            </Link>
          </div>
          <div className={styles.p}>
            Сообщение получат топ-менеджеры компании, его рассмотрит ответственное подразделение и
            предоставит ответ.
          </div>
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(WriteToManagementModal);
