import { FC, HTMLAttributes, memo } from 'react';
import cns from 'classnames';

import styles from './CylindoRotateHint.module.css';

export interface CylindoRotateHintProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CylindoRotateHint: FC<CylindoRotateHintProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cns(styles.cylindoRotateHint, className)}>
      <div className={styles.arrowPrev} />
      <div className={styles.text}>Вращайте модель</div>
      <div className={styles.arrowNext} />
    </div>
  );
};

export default memo(CylindoRotateHint);
