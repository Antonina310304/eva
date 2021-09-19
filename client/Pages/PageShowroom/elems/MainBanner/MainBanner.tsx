import React, { FC, memo, HTMLAttributes, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import styles from './MainBanner.module.css';

interface MainBannerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const MainBanner: FC<MainBannerProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickButton = useCallback(() => {
    openModal('VideoConsultation');
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.title}>Видеоконсультация со специалистом</div>
          <div className={styles.description}>
            Персональные видеоконсультации со специалистом магазина позволят выбрать мебель не
            выходя из дома.
          </div>
          <Button theme='primary' className={styles.button} onClick={handleClickButton}>
            Отправить заявку
          </Button>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img src='/react/static/img/showroom/image.png' className={styles.img} />
      </div>
    </div>
  );
};

export default memo(MainBanner);
