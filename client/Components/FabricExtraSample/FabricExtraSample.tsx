import React, { HTMLAttributes, FC, memo, useCallback, useMemo, MutableRefObject } from 'react';
import cn from 'classnames';

import Icon12CheckDark from '@divanru/icons/dist/12/check_dark';
import Icon90SampleMask from '@divanru/icons/dist/90/sample_mask';

import Image from '@UI/Image';

import useOrderFabrics from '@Hooks/useOrderFabrics';
import { ConstructorValueData } from '@Types/Constructor';
import styles from './FabricExtraSample.module.css';

export interface FabricExtraSampleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
  isFirstCollection?: boolean;
  modalView?: boolean;
  largeImage?: boolean;
  sample: ConstructorValueData;
  refCatalog: MutableRefObject<HTMLDivElement>;
}

const FabricExtraSample: FC<FabricExtraSampleProps> = (props) => {
  const {
    className,
    sample,
    refCatalog,
    visible,
    modalView = true,
    largeImage = false,
    isFirstCollection,
    ...restProps
  } = props;
  const orderFabrics = useOrderFabrics();

  const maskSize = largeImage ? 123 : 90;

  const selected = useMemo(() => {
    return (
      orderFabrics.data.selected.findIndex((selectedItem) => selectedItem.sample === sample) > -1
    );
  }, [orderFabrics.data.selected, sample]);

  const view = useMemo(() => (visible && modalView ? 'gray' : 'white'), [modalView, visible]);

  const handleClick = useCallback(() => {
    orderFabrics.toggleSelect({ sample });
  }, [orderFabrics, sample]);

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
      onClick={handleClick}
    >
      <div className={styles.wrapperImage}>
        <div>
          <Icon90SampleMask width={maskSize} height={maskSize} className={styles.mask} />
          <Image className={cn(styles.image, { [styles.large]: largeImage })} src={sample.image} />
        </div>

        <div className={styles.wrapperOk}>
          <div className={styles.ok}>
            <Icon12CheckDark className={styles.iconOk} width={14} height={10} />
          </div>
        </div>
      </div>

      <div className={styles.name}>{sample.title}</div>
    </div>
  );
};

export default memo(FabricExtraSample);
