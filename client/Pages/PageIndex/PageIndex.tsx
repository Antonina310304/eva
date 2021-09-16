import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import { MetaData } from '@Types/Meta';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickVideoConsultationButton = useCallback(() => {
    openModal('VideoConsultation');
  }, [openModal]);

  const handleClickDesignerServicesButton = useCallback(() => {
    openModal('DesignerServices');
  }, [openModal]);

  const handleClickQuestionButton = useCallback(() => {
    openModal('Question');
  }, [openModal]);

  const handleClickCallbackButton = useCallback(() => {
    openModal('Callback');
  }, [openModal]);

  const handleClickWriteToManagementButton = useCallback(() => {
    openModal('WriteToManagement');
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <Button onClick={handleClickVideoConsultationButton} className={styles.button}>
        Видеоконсультация со специалистом
      </Button>

      <Button onClick={handleClickDesignerServicesButton} className={styles.button}>
        Услуга дизайнера
      </Button>

      <Button onClick={handleClickQuestionButton} className={styles.button}>
        Задать вопрос
      </Button>

      <Button onClick={handleClickCallbackButton} className={styles.button}>
        Заказать обратный звонок
      </Button>

      <Button onClick={handleClickWriteToManagementButton} className={styles.button}>
        Написать руководству
      </Button>
    </div>
  );
};

export default memo(PageIndex);
