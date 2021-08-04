import React, { FC, memo, useCallback, useState, useEffect, useMemo } from 'react';
import cn from 'classnames';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import useModals from '@Hooks/useModals';
import Image from '@UI/Image';
import Link from '@UI/Link';
import useMedias from '@Hooks/useMedias';
import AsyncVimeo from './elems/AsyncVimeo';
import styles from './QualityGuaranteeModal.module.css';

const QualityGuaranteeModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();
  const { isMobile } = useMedias();

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleClickLink = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <ModalSidebar
      {...restProps}
      className={cn(styles.modal, className)}
      title='Гарантируем качество'
      view='default'
      modal={modal}
    >
      <div className={styles.videoContent}>
        {isPlaying ? (
          <AsyncVimeo className={styles.video} video='458955708' autoplay muted={isMobile} />
        ) : (
          <div className={styles.poster} onClick={handleClickPlay}>
            <Image
              className={styles.posterImage}
              src='/react/static/QualityGuaranteeModal/video-poster.jpg'
            />
            <div className={styles.posterIcon} />
          </div>
        )}
      </div>

      <div className={styles.text}>
        Мы – трендсеттеры на мебельном рынке, зачастую наши модели копируют конкуренты. Посмотрим,
        как они это делают. Мы подготовили обзор, в котором рассказываем на что стоит обратить
        внимание при выборе дивана, чтобы не ошибиться!
      </div>

      <div className={styles.nuance}>
        * при оформлении заказа в кредит без переплаты условия других акций на покупку не действуют.
      </div>

      <div className={styles.linkWrapper}>
        <Link className={styles.link} to='/scandinavian-collection' onClick={handleClickLink}>
          Подробнее о производстве
        </Link>
      </div>
    </ModalSidebar>
  );
};

export default memo(QualityGuaranteeModal);
