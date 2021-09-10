import React, { memo, HTMLAttributes, FC, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

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
  const { className, sample, vse, foo, ...restProps } = props;
  const removable = Boolean(restProps.removable && sample);
  const orderFabrics = useOrderFabrics();

  const handleClick = useCallback(() => {
    if (!removable) return;

    // orderFabrics.toggleSelect({ sample });
    foo({ sample });
  }, [foo, removable, sample]);

  return (
    <div
      {...restProps}
      className={cn(styles.fabricSample, { [styles.removable]: removable }, [className])}
      onClick={handleClick}
    >
      <CSSTransition unmountOnExit classNames={styles.image} timeout={400} in={!!sample}>
        <Image className={styles.image} src={sample ? sample.image : ''} />
      </CSSTransition>
      {removable && <div className={styles.iconRemove} />}

      <div className={styles.iconPlus} />
    </div>
  );
};

export default memo(FabricSample);
