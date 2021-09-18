import { memo, HTMLAttributes, FC, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import Image from '@UI/Image';
import { ConstructorValueData } from '@Types/Constructor';
import styles from './FabricSample.module.css';

export interface FabricSampleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sample?: ConstructorValueData;
  removable?: boolean;
  checkedSamples?: any;
  checkSample?: (sample: any) => void;
}

const FabricSample: FC<FabricSampleProps> = (props) => {
  const { className, sample, checkSample, ...restProps } = props;
  const removable = Boolean(restProps.removable && sample);

  const handleClick = useCallback(() => {
    if (!removable) return;

    checkSample({ sample });
  }, [checkSample, removable, sample]);

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
