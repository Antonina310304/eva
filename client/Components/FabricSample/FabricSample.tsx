import React, { memo, HTMLAttributes, FC, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import Icon19Plus from '@divanru/icons/dist/19/plus';
import Icon31CircleCross from '@divanru/icons/dist/31/circle_cross';

import Image from '@UI/Image';

import { ConstructorValueData } from '@Types/Constructor';
import useOrderFabrics from '@Hooks/useOrderFabrics';
import styles from './FabricSample.module.css';

export interface FabricSampleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sample?: ConstructorValueData;
  removable?: boolean;
}

const FabricSample: FC<FabricSampleProps> = (props) => {
  const { className, sample, ...restProps } = props;
  const removable = Boolean(restProps.removable && sample);
  const orderFabrics = useOrderFabrics();

  const handleClick = useCallback(() => {
    if (!removable) return;

    orderFabrics.toggleSelect({ sample });
  }, [orderFabrics, removable, sample]);

  return (
    <div
      {...restProps}
      className={cn(styles.fabricSample, { [styles.removable]: removable }, [className])}
      onClick={handleClick}
    >
      <CSSTransition unmountOnExit classNames={styles.image} timeout={400} in={!!sample}>
        <Image className={styles.image} src={sample ? sample.image : ''} />
      </CSSTransition>
      {removable && <Icon31CircleCross className={styles.iconRemove} />}

      <Icon19Plus className={styles.iconPlus} />
    </div>
  );
};

export default memo(FabricSample);
