import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import MainSlider from '@Pages/PageIndex/elems/MainSlider';
import Hits from '@Pages/PageIndex/elems/Hits';
import Recommendations from '@Pages/PageIndex/elems/Recommendations';
import Popular from '@Pages/PageIndex/elems/Popular';
import Ideas from '@Pages/PageIndex/elems/Ideas';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickButton = useCallback(() => {
    openModal('RegionSelector');
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <MainSlider />
      <Hits />
      <Recommendations />
      <Popular />
      <Ideas />
      <p>Лучше один раз увидеть!</p>
      <p>Ищите вдохновение в инстаграм @official_divan.ru</p>

      <Button onClick={handleClickButton}>Change region</Button>
    </div>
  );
};

export default memo(PageIndex);
