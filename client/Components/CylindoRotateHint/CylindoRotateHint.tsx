import React, { FC, HTMLAttributes, memo } from 'react';
import cns from 'classnames';

import Icon10LongArrowLeft from '@divanru/icons/dist/10/long_arrow_left';
import Icon10LongArrowRight from '@divanru/icons/dist/10/long_arrow_right';

import styles from './CylindoRotateHint.module.css';

export interface CylindoRotateHintProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CylindoRotateHint: FC<CylindoRotateHintProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cns(styles.CylindoRotateHint, className)}>
      <Icon10LongArrowLeft className={styles.ArrowPrev} />
      Вращайте модель
      <Icon10LongArrowRight className={styles.ArrowNext} />
    </div>
  );
};

export default memo(CylindoRotateHint);
