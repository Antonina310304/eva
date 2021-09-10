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

  const handleClickButton = useCallback(() => {
    openModal('RegionSelector');
  }, [openModal]);

  const handleClickVideoConsultationButton = useCallback(() => {
    openModal('VideoConsultation');
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <Button onClick={handleClickButton}>Change region</Button>

      <Button onClick={handleClickVideoConsultationButton} className={styles.button}>
        Видеоконсультация со специалистом
      </Button>
    </div>
  );
};

export default memo(PageIndex);
