import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import { MetaData } from '@Types/Meta';
import Select, { SelectItemData } from '@UI/Select';
import SampleOption from '@UI/MainSelect/elems/SampleOption/SampleOption';
import MainSelect from '@UI/MainSelect';
import Gallery from '@UI/Gallery';
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
  const items: SelectItemData[] = [
    { id: 'test21', title: 'test21', name: 'test1' },
    { id: 'test2', title: 'test2', name: 'test2' },
    { id: 'test3', title: 'test3', name: 'test3' },
    { id: 'test4', title: 'test4', name: 'test4' },
    { id: 'test5', title: 'test5', name: 'test5' },
    { id: 'test6', title: 'test6', name: 'test6' },
  ];

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <MainSelect
        className={styles.select}
        mode='single'
        items={items}
        defaultChecked={items[0]}
        renderItem={(itemProps: SelectItemData) => {
          return <SampleOption item={itemProps} />;
        }}
      />

      <div className={styles.slider}>
        <Gallery slideIndex={1}>
          {Array(7)
            .fill('')
            .map((item, index) => {
              // const activeElem = index === slideIndex;
              return (
                <div key={index} className={styles.slideWrapper}>
                  <div className={styles.slideInner}>
                    <p>{index + 1}</p>
                    <img src='slider.png' alt='' />
                  </div>
                </div>
              );
            })}
        </Gallery>
      </div>
      <Button onClick={handleClickButton}>Change region</Button>
    </div>
  );
};

export default memo(PageIndex);
