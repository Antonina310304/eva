import React, { HTMLAttributes, FC, memo, useCallback, useMemo, MutableRefObject } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import useModals from '@Hooks/useModals';
import { ConstructorValueData } from '@Types/Constructor';
import styles from './FabricExtraSample.module.css';

export interface FabricExtraSampleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
  isFirstCollection?: boolean;
  modalView?: boolean;
  sample: ConstructorValueData;
  refCatalog: MutableRefObject<HTMLDivElement>;
  checkedSamples?: any;
  checkSample?: (sample: any) => void;
}

const FabricExtraSample: FC<FabricExtraSampleProps> = (props) => {
  const {
    className,
    sample,
    refCatalog,
    visible,
    modalView = true,
    isFirstCollection,
    checkedSamples,
    checkSample,
    ...restProps
  } = props;
  const [, { openModal }] = useModals();

  const selected = useMemo(() => {
    return checkedSamples.findIndex((selectedItem) => selectedItem.sample === sample) > -1;
  }, [checkedSamples, sample]);

  const view = useMemo(() => (visible && modalView ? 'gray' : 'white'), [modalView, visible]);

  const handleClick = useCallback(() => {
    checkSample({ sample });
  }, [checkSample, sample]);

  const handleClickMoreInfo = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  return (
    <div
      {...restProps}
      className={cn(
        styles.fabricExtraSample,
        {
          [styles.selected]: selected,
          [styles.gray]: view === 'gray',
          [styles.white]: view === 'white',
          [styles.modalView]: modalView,
        },
        [className],
      )}
    >
      <div className={styles.wrapperImage} onClick={handleClick}>
        <div>
          <div className={styles.maska} />
          <Image className={styles.image} src={sample.image} />
        </div>

        {!selected && (
          <div className={styles.wrapperIcon}>
            <div className={styles.iconAdd} />
          </div>
        )}

        {selected && (
          <div className={styles.wrapperIcon}>
            <div className={styles.iconDel} />
          </div>
        )}
      </div>

      <div className={styles.name}>{sample.title}</div>

      <div className={styles.moreInfo} onClick={handleClickMoreInfo}>
        Подробнее
      </div>
    </div>
  );
};

export default memo(FabricExtraSample);
